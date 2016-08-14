<?php
// src/AppBundle/Controller/MainController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MainController extends Controller
{
	public function indexAction(Request $request)
	{
		$session = $request->getSession();
		$user_id = $session->get('user_id');
		if(isset($user_id) && !empty($user_id)){
			$firstname = $session->get('firstname');
			$lastname = $session->get('lastname');
		}else{
			$user_id = -1;
			$firstname = null;
			$lastname = null;
		}

		return $this->render('main/pickomino.html.twig', array(
			'user_id' => $user_id,
			'firstname' => $firstname,
			'lastname' => $lastname,
		));
	}

	public function showRulesAction()
	{
		return $this->render('rules/rules.html.twig', array());
	}
}