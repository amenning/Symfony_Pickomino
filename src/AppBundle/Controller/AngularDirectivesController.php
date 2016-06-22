<?php
// src/AppBundle/Controller/AngularDirectivesController.php
namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AngularDirectivesController extends Controller
{
	public function showDirectiveAction($name)
	{
		return $this->render('directives/'.$name.'.html.twig', array());
	}
}