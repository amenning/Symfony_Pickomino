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
	public function entryAction(Request $request)
	{			
		$errors = array();  // array to hold validation errors
		$data = array();    // array to pass back data
		
		$username = $request->get('username');
		$password = $request->get('password');
		
		if(isset($username) && isset($password)){
			if(!empty($username) && !empty($password)){
				$player = $this->getDoctrine()
					->getRepository('AppBundle:Player')
        			->findOneByUsername($username);	
					
				if($player){
					if($player->getPassword() !== $password){
						 $errors['message'] = 'Invalid username/password.';
					}else{
						$user_id = $player->getId();
						$firstname = $player->getFirstname();				
						$lastname = $player->getLastname();
						
						$session = $request->getSession();
						$session->set('user_id', $user_id);
						$session->set('firstname', $firstname);
						$session->set('lastname', $lastname);
						
						$data['success'] = true;
						$data['firstname'] = $firstname;
						$data['user_id'] = $user_id;
					}
				}else{
					$errors['message'] = 'Invalid username/password!';
				}
			}else{
				$errors['message'] = 'You must supply a username and password';
			}
		}
		
		if (!empty($errors)) {
		
		  // if there are items in our errors array, return those errors
		  $data['success'] = false;
		  $data['errors']  = $errors;
		} else {
		
		  // if there are no errors, return a message
		  $data['success'] = true;
		  $data['message'] = 'Success!';
		}
		
		// return all our data to an AJAX call
		$response = json_encode($data);			
			
		return new Response($response);
	}
		
	public function logoutAction(Request $request)
	{
		$session = $request->getSession();
		$session->invalidate();
		return $this->redirectToRoute('homepage');
	}
	
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