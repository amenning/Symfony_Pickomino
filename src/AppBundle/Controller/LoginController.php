<?php
// src/AppBundle/Controller/LoginController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use AppBundle\Entity\Player;

class LoginController extends Controller
{
	public function guestRegistrationAction(Request $request)
	{
		$player = new Player();
		$post_data = json_decode($request->getContent());
		$player->setUsername($post_data->username);
		$player->setFirstname($post_data->firstname);
		$player->setLastname($post_data->lastname);
		$player->setPassword($post_data->password);
		$player->setEmail($post_data->email);
		
		$em = $this->getDoctrine()->getManager();
		
		$em->persist($player);
		
		$em->flush();
		
		return new Response($player->getId());
	}
	
	public function registrationAction(Request $request)
	{
		$player = new Player();
		$player->setUsername($request->get('username'));
		$player->setFirstname($request->get('firstname'));
		$player->setLastname($request->get('lastname'));
		$player->setPassword($request->get('password'));
		$player->setEmail($request->get('email'));
		
		$em = $this->getDoctrine()->getManager();
		
		$em->persist($player);
		
		$em->flush();
		
		return $this->redirectToRoute('homepage');
	}
}