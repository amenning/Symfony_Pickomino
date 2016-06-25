<?php
// src/AppBundle/Controller/GameStateController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use AppBundle\Entity\Game;
use AppBundle\Entity\GameState;

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
				
		$em = $this->getDoctrine()->getManager();
		
		$em->persist($game);
		
		$em->flush();
		
		return new Response($game->getId());
	}	
}