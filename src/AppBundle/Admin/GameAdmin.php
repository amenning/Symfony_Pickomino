<?php

// src/AppBundle/Admin/GameAdmin.php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Validator\ErrorElement;
use Sonata\AdminBundle\Form\FormMapper;

class GameAdmin extends AbstractAdmin
{
    protected $datagridValues = array(
		'_sort_order' => 'ASC',
		'_sort_by' => 'id'
	);

	protected function configureFormFields(FormMapper $formMapper)
	{
		$formMapper
		    ->add('player')
		;
	}


	protected function configureDatagridFilters(DatagridMapper $datagridMapper)
	{
		$datagridMapper
		    ->add('player')
		;
	}

	protected function configureListFields(ListMapper $listMapper)
	{
		$listMapper
			->addIdentifier('id')
			->add('player')
			->add('created_at', 'datetime', array('date_format' => 'yyyy-MM-dd HH:mm:ss'))
			->add('updated_at', 'datetime', array('date_format' => 'yyyy-MM-dd HH:mm:ss'))
		;
	}
}