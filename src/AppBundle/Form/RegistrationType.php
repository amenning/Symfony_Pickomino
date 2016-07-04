<?php
// src/AppBundle/Form/RegistrationType.php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class RegistrationType extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder, array $options)
	{
		$builder
			->add('firstname', null, array('label' => 'form.firstname', 'translation_domain' => 'FOSUserBundle'))
			->add('lastname', null, array('label' => 'form.lastname', 'translation_domain' => 'FOSUserBundle'));
	}
	
	public function getParent()
	{
		return 'FOS\UserBundle\Form\Type\RegistrationFormType';
		
		// Or for Symfony < 2.8
		// return 'fos_user_registration';
	}
	
	public function getBlockPrefix()
	{
		return 'app_user_registration';
	}
	
	// For Symfony 2.x
	public function getName()
	{
		return $this->getBlockPrefix();
	}
}