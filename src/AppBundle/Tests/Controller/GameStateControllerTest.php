<?php
namespace AppBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;
use AppBundle\Controller\GameStateController;

class GameStateControllerTest extends WebTestCase
{
    public function createClientWithUser(
        $username = 'test456',
        $password = 'test456',
        $email = 'test456@test.com',
        $firstname = 'testFirst',
        $lastname = 'testLast'
    )
    {
        $client = static::createClient();

        // register user with FOS registerAction
        $crawler = $client->request('GET', '/register/');

        $form = $crawler->selectButton('Register')->form(array(
            'fos_user_registration_form[email]'     => $email,
            'fos_user_registration_form[username]'  => $username,
            'fos_user_registration_form[plainPassword][first]'  => $password,
            'fos_user_registration_form[plainPassword][second]' => $password,
            'fos_user_registration_form[firstname]' => $firstname,
            'fos_user_registration_form[lastname]'  => $lastname,
        ));

        $client->submit($form);

        return $client;
    }

    public function deleteUser($username = 'test456')
    {
        // Clean up database
        $kernel = static::createKernel();
        $kernel->boot();
        $em = $kernel->getContainer()->get('doctrine.orm.entity_manager');
        $newUserToDelete = $em->getRepository('AppBundle:Player')->findOneByUsername($username);
        $em->remove($newUserToDelete);
        $em->flush();
    }

    public function deleteGame($gameId)
    {
        // Clean up database
        $kernel = static::createKernel();
        $kernel->boot();
        $em = $kernel->getContainer()->get('doctrine.orm.entity_manager');
        $newGameToDelete = $em->getRepository('AppBundle:Game')->findOneById($gameId);
        $em->remove($newGameToDelete);
        $em->flush();
    }

    public function deleteGameState($gameStateId)
    {
        // Clean up database
        $kernel = static::createKernel();
        $kernel->boot();
        $em = $kernel->getContainer()->get('doctrine.orm.entity_manager');
        $newGameStateToDelete = $em->getRepository('AppBundle:GameState')->findOneById($gameStateId);
        $em->remove($newGameStateToDelete);
        $em->flush();
    }

    public function testNewGameAction()
	{
        $client = $this->createClientWithUser();

        $container = $client->getContainer();
        $user = $container->get('security.token_storage')->getToken()->getUser();
        $userId = $user->getId();

        $kernel = static::createKernel();
        $kernel->boot();
        $em = $kernel->getContainer()->get('doctrine.orm.entity_manager');

        $query = $em->createQuery('SELECT count(g.id) from AppBundle:Game g WHERE g.player = :player');
        $query->setParameter('player', $userId);
        $initialGameNumberCount = $query->getSingleScalarResult();

		$crawler = $client->request('POST', '/new_game', array(), array(), array(), json_encode(array('userID' => $userId)));
		$this->assertEquals('AppBundle\Controller\GameStateController::newGameAction', $client->getRequest()->attributes->get('_controller'));
        $this->assertEquals($initialGameNumberCount+1, $query->getSingleScalarResult());

        $query = $em->createQuery('SELECT g.id from AppBundle:Game g WHERE g.player = :player ORDER BY g.id DESC');
        $query->setParameter('player', $userId);
        $newestGameId = $query->getSingleScalarResult();
        $this->assertEquals($newestGameId, $client->getResponse()->getContent());

		// Clean up database
		$this->deleteGame($newestGameId);
		$this->deleteUser($user->getUsername());
	}

    public function testSaveAndLoadGameAction()
    {
        $client = $this->createClientWithUser();

        $container = $client->getContainer();
        $user = $container->get('security.token_storage')->getToken()->getUser();
        $userId = $user->getId();

        $kernel = static::createKernel();
        $kernel->boot();
        $em = $kernel->getContainer()->get('doctrine.orm.entity_manager');

        $query = $em->createQuery('SELECT count(g.id) from AppBundle:Game g WHERE g.player = :player');
        $query->setParameter('player', $userId);

        $crawler = $client->request('POST', '/new_game', array(), array(), array(), json_encode(array('userID' => $userId)));

        $query = $em->createQuery('SELECT g.id from AppBundle:Game g WHERE g.player = :player ORDER BY g.id DESC');
        $query->setParameter('player', $userId);
        $newestGameId = $query->getSingleScalarResult();

        $queryData = array(
            "gameID" => $newestGameId,
            "gameStatus" => "status",
            "grillWorms" => "grillWorms",
            "deadGrillWorms" => "deadGrillWorms",
            "playerMessage" => "playerMessage",
            "activeDice" => "activeDice",
            "frozenDice" => "frozenDice",
            "frozenDiceTotal" => "frozenDiceTotal",
            "playerWorms" => "playerWorms",
            "playerWormsTotals" => "playerWormsTotals",
        );

        $crawler = $client->request('POST', '/save_game_state', array(), array(), array(), json_encode($queryData));
        $query = $em->createQuery('SELECT gs.id from AppBundle:GameState gs WHERE gs.game = :game ORDER BY gs.id DESC');
        $query->setParameter('game', $newestGameId);
        $newestGameStateId = $query->getSingleScalarResult();
        $this->assertEquals($newestGameStateId, $client->getResponse()->getContent());

        $crawler = $client->request('POST', '/load_game', array(), array(), array(), json_encode(array('userID' => $userId)));

        $expectedGameStateArray = $queryData;
        $expectedGameStateArray["gameStateID"] = $newestGameStateId;
        $loadedGameStateArray = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals($expectedGameStateArray, $loadedGameStateArray);

        // Clean up database
        $this->deleteGameState($newestGameStateId);
        $this->deleteGame($newestGameId);
        $this->deleteUser($user->getUsername());
    }
}
