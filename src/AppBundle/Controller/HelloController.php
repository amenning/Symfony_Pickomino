<?php
// src/AppBundle/Controller/HelloController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class HelloController extends Controller
{
	/**
	 * @Route("/hello/{firstname}/{lastname}", name="hello")
	 */
	public function indexAction($firstname, $lastname)
	{
		$this->addFlash(
			'notice',
			'Hello '.ucwords($firstname).' '.ucwords($lastname)
		);	
			
		//return new Response('<html><body>Hello '.$name.'!</body></html>');
		
		return $this->render('hello/index.html.twig', array(
			'firstname' => ucwords($firstname),
			'lastname' => ucwords($lastname)
		));
	}
}