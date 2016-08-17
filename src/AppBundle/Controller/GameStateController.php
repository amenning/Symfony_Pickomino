<?php
// src/AppBundle/Controller/GameStateController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Doctrine\ORM\EntityRepository;
use AppBundle\Entity\Game;
use AppBundle\Entity\GameState;
use AppBundle\Entity\Player;

class GameStateController extends Controller
{
	public function newGameAction(Request $request)
	{
		$post_data = json_decode($request->getContent());
		$player = $this->getDoctrine()
			->getRepository('AppBundle:Player')
        	->find($post_data->userID);

		$game = new Game();
		$game->setPlayer($player);
		$player->addGame($game);

		$em = $this->getDoctrine()->getManager();

		$em->persist($game);

		$em->flush();

		return new Response($game->getId());
	}

	public function saveGameAction(Request $request)
	{
		$post_data = json_decode($request->getContent());

		$gameStatus = serialize($post_data->gameStatus);
		$grillWorms = serialize($post_data->grillWorms);
		$deadGrillWorms = serialize($post_data->deadGrillWorms);
		$playerMessage = serialize($post_data->playerMessage);
		$activeDice = serialize($post_data->activeDice);
		$frozenDice = serialize($post_data->frozenDice);
		$frozenDiceTotal = serialize($post_data->frozenDiceTotal);
		$playerWorms = serialize($post_data->playerWorms);
		$playerWormsTotals = serialize($post_data->playerWormsTotals);

		$current_game = $this->getDoctrine()
			->getRepository('AppBundle:Game')
        	->find($post_data->gameID);

		$new_gamestate = new GameState();
		$new_gamestate->setGame($current_game);
		$new_gamestate->setGameStatus($gameStatus);
		$new_gamestate->setGrillWorms($grillWorms);
		$new_gamestate->setDeadGrillWorms($deadGrillWorms);
		$new_gamestate->setPlayerMessage($playerMessage);
		$new_gamestate->setActiveDice($activeDice);
		$new_gamestate->setFrozenDice($frozenDice);
		$new_gamestate->setFrozenDiceTotal($frozenDiceTotal);
		$new_gamestate->setPlayerWorms($playerWorms);
		$new_gamestate->setPlayerWormsTotals($playerWormsTotals);

		$current_game->addGameState($new_gamestate);

		$em = $this->getDoctrine()->getManager();

		$em->persist($new_gamestate);

		$em->flush();

		return new Response($new_gamestate->getId());
	}

	public function loadGameAction(Request $request)
	{
		$post_data = json_decode($request->getContent());

		$player = $this->getDoctrine()
			->getRepository('AppBundle:Player')
        	->find($post_data->userID);

		$games = $player->getGames();

		if(sizeof($games)>0){
			$currentGameID = $games->last()->getId();

			$game_states = $this->getDoctrine()
				->getRepository('AppBundle:GameState')
	        	->findBy(
	    			array('game' => $currentGameID),
	    			array('id' => 'ASC')
				);
			$current_game_state = end($game_states);

			$gameStateID = $current_game_state->getId();
			$gameStatus = unserialize($current_game_state->getGameStatus());
			$grillWorms = unserialize($current_game_state->getGrillWorms());
			$deadGrillWorms = unserialize($current_game_state->getDeadGrillWorms());
			$playerMessage = unserialize($current_game_state->getPlayerMessage());
			$activeDice = unserialize($current_game_state->getActiveDice());
			$frozenDice = unserialize($current_game_state->getFrozenDice());
			$frozenDiceTotal = unserialize($current_game_state->getFrozenDiceTotal());
			$playerWorms = unserialize($current_game_state->getPlayerWorms());
			$playerWormsTotals = unserialize($current_game_state->getPlayerWormsTotals());

			$response = json_encode(array(  'gameStateID' => $gameStateID,
											'gameID' => $currentGameID,
											'gameStatus' => $gameStatus,
							  				'grillWorms' => $grillWorms,
							  				'deadGrillWorms' => $deadGrillWorms,
											'activeDice' => $activeDice,
											'frozenDice' => $frozenDice,
											'frozenDiceTotal' => $frozenDiceTotal,
											'gameStatus' => $gameStatus,
											'playerMessage' => $playerMessage,
											'playerWorms' => $playerWorms,
											'playerWormsTotals' => $playerWormsTotals
									));
		} else {
			$response = json_encode(false);
		}

		return new Response($response);
	}

}