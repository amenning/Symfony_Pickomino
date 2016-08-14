<?php
namespace AppBundle\Tests\Form\Type;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use FOS\UserBundle\Util\UserManipulator;

class RegistrationFormTypeTest extends WebTestCase
{
    public function testSubmit()
	{
		$client = static::createClient();

		// test register path uses FOS registerAction
		$crawler = $client->request('GET', '/register/');
		$this->assertEquals('FOS\UserBundle\Controller\RegistrationController::registerAction', $client->getRequest()->attributes->get('_controller'));


		$form = $crawler->selectButton('Register')->form(array(
			'fos_user_registration_form[email]'		=> 'test456@test.com',
			'fos_user_registration_form[username]'	=> 'test456',
			'fos_user_registration_form[plainPassword][first]'	=> 'test456',
			'fos_user_registration_form[plainPassword][second]'	=> 'test456',
			'fos_user_registration_form[firstname]'	=> 'testFirst',
			'fos_user_registration_form[lastname]'	=> 'testLast',
		));

		$client->submit($form);
		$this->assertEquals('FOS\UserBundle\Controller\RegistrationController::registerAction', $client->getRequest()->attributes->get('_controller'));

		$client->followRedirect(true);
		$this->assertEquals('FOS\UserBundle\Controller\RegistrationController::confirmedAction', $client->getRequest()->attributes->get('_controller'));

		// testing for the new user database record
		$kernel = static::createKernel();
		$kernel->boot();
		$em = $kernel->getContainer()->get('doctrine.orm.entity_manager');

		$query = $em->createQuery('SELECT count(p.id) from AppBundle:Player p WHERE p.username = :username');
		$query->setParameter('username', 'test456');
		$this->assertTrue(1 == $query->getSingleScalarResult());

		// Clean up database
		$newUserToDelete = $em->getRepository('AppBundle:Player')->findOneByUsername('test456');
		$em->remove($newUserToDelete);
		$em->flush();
		$query = $em->createQuery('SELECT count(p.id) from AppBundle:Player p WHERE p.username = :username');
		$query->setParameter('username', 'test456');
		$this->assertTrue(0 == $query->getSingleScalarResult());
	}

	public function testGuest()
	{
        $client = static::createClient();

		// test guest login path use guestRegistrationAction
		$crawler = $client->request('GET', '/angular_directives/game-login');
		$link = $crawler->selectLink('Guest Login')->link();
		$crawler = $client->click($link);
		$this->assertEquals('AppBundle\Controller\LoginController::guestRegistrationAction', $client->getRequest()->attributes->get('_controller'));

		// following successful guest creation, it redirects to homepage
		$client->followRedirect(true);
		$this->assertEquals('AppBundle\Controller\MainController::indexAction', $client->getRequest()->attributes->get('_controller'));
	}
}
