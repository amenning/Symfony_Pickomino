<?php

// src/AppBundle/Admin/GameStateAdmin.php

namespace AppBundle\Admin;

use Sonata\AdminBundle\Admin\AbstractAdmin;
use Sonata\AdminBundle\Datagrid\ListMapper;
use Sonata\AdminBundle\Datagrid\DatagridMapper;
use Sonata\AdminBundle\Validator\ErrorElement;
use Sonata\AdminBundle\Form\FormMapper;

class GameStateAdmin extends AbstractAdmin
{
    protected $datagridValues = array(
		'_sort_order' => 'ASC',
		'_sort_by' => 'id'
	);
	/*
	protected function configureFormFields(FormMapper $formMapper)
	{
		$formMapper
		    ->add('game')
		;
	}


	protected function configureDatagridFilters(DatagridMapper $datagridMapper)
	{
		$datagridMapper
		    ->add('game')
		;
	}
	*/
	protected function configureListFields(ListMapper $listMapper)
	{
		$listMapper
			->addIdentifier('id')
			->add('game')
			->add('grill_worms')
			->add('dead_grill_worms')
			->add('active_dice')
			->add('frozen_dice')
			->add('frozen_dice_total')
			->add('game_status')
			->add('player_message')
			->add('player_worms')
			->add('player_worms_totals')
			->add('created_at', 'datetime', array('date_format' => 'yyyy-MM-dd HH:mm:ss'))
		;
	}
}