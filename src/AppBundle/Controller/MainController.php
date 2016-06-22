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
	/**
	 * @Route("/", name="homepage")
	 */
	public function indexAction()
	{				
		return $this->render('main/pickomino.html.twig', array());
	}
}