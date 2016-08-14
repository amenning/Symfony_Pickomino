<?php
// src/AppBundle/Tests/Controller/MainControllerTest.php
namespace AppBundle\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;
use AppBundle\Controller\MainController;

class MainControllerTest extends WebTestCase
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
        $client->followRedirect(true);

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


    public function testIndexAction()
    {
        $client = $this->createClientWithUser();

        $container = $client->getContainer();

        $user = $container->get('security.token_storage')->getToken()->getUser();

        $session = $container->get('session');

        $userId = $user->getId();
        $firstname = $user->getFirstname();
        $lastname = $user->getLastname();

        $crawler = $client->request('GET', '/home');

        $this->assertEquals(
            'AppBundle\Controller\MainController::indexAction',
            $client->getRequest()->attributes->get('_controller')
        );
        $this->assertContains($firstname, $client->getResponse()->getContent());

        $this->deleteUser($user->getUsername());
    }
}