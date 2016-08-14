<?php

// src/AppBundle/Admin/PlayerAdmin.php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Validator\ErrorElement;
use Sonata\AdminBundle\Form\FormMapper;

class PlayerAdmin extends AbstractAdmin
{
	protected $datagridValues = array(
		'_sort_order' => 'ASC',
		'_sort_by' => 'username'
	);

	protected function configureFormFields(FormMapper $formMapper)
	{
		$formMapper
		    ->add('username')
			->add('firstname')
			->add('lastname')
			->add('email')
			->add('enabled')
			//->add('password')
			//->add('roles')
		;
	}

	protected function configureDatagridFilters(DatagridMapper $datagridMapper)
	{
		$datagridMapper
		    ->add('username')
		;
	}

	protected function configureListFields(ListMapper $listMapper)
	{
		$listMapper
			->addIdentifier('id')
			->add('username')
			->add('firstname')
			->add('lastname')
			->add('email')
			->add('username_canonical')
			->add('email_canonical')
			->add('enabled')
			//->add('salt')
			//->add('password')
			->add('last_login', 'datetime', array('date_format' => 'yyyy-MM-dd HH:mm:ss'))
			->add('locked')
			->add('expired')
			->add('expires_at', 'datetime', array('date_format' => 'yyyy-MM-dd HH:mm:ss'))
			->add('confirmation_token')
			->add('password_requested_at', 'datetime', array('date_format' => 'yyyy-MM-dd HH:mm:ss'))
			->add('roles')
			->add('credentials_expired')
			->add('credentials_expire_at', 'datetime', array('date_format' => 'yyyy-MM-dd HH:mm:ss'))
		;
	}
}