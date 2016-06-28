<?php

namespace AppBundle\Entity;

/**
 * GameState
 */
class GameState
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $grillWorms;

    /**
     * @var string
     */
    private $deadGrillWorms;

    /**
     * @var string
     */
    private $activeDice;

    /**
     * @var string
     */
    private $frozenDice;

    /**
     * @var string
     */
    private $frozenDiceTotal;

    /**
     * @var string
     */
    private $gameStatus;

    /**
     * @var string
     */
    private $playerMessage;

    /**
     * @var string
     */
    private $playerWorms;

    /**
     * @var string
     */
    private $playerWormsTotals;

    /**
     * @var \DateTime
     */
    private $created_at;

    /**
     * @var \AppBundle\Entity\Game
     */
    private $game;


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set grillWorms
     *
     * @param string $grillWorms
     *
     * @return GameState
     */
    public function setGrillWorms($grillWorms)
    {
        $this->grillWorms = $grillWorms;

        return $this;
    }

    /**
     * Get grillWorms
     *
     * @return string
     */
    public function getGrillWorms()
    {
        return $this->grillWorms;
    }

    /**
     * Set deadGrillWorms
     *
     * @param string $deadGrillWorms
     *
     * @return GameState
     */
    public function setDeadGrillWorms($deadGrillWorms)
    {
        $this->deadGrillWorms = $deadGrillWorms;

        return $this;
    }

    /**
     * Get deadGrillWorms
     *
     * @return string
     */
    public function getDeadGrillWorms()
    {
        return $this->deadGrillWorms;
    }

    /**
     * Set activeDice
     *
     * @param string $activeDice
     *
     * @return GameState
     */
    public function setActiveDice($activeDice)
    {
        $this->activeDice = $activeDice;

        return $this;
    }

    /**
     * Get activeDice
     *
     * @return string
     */
    public function getActiveDice()
    {
        return $this->activeDice;
    }

    /**
     * Set frozenDice
     *
     * @param string $frozenDice
     *
     * @return GameState
     */
    public function setFrozenDice($frozenDice)
    {
        $this->frozenDice = $frozenDice;

        return $this;
    }

    /**
     * Get frozenDice
     *
     * @return string
     */
    public function getFrozenDice()
    {
        return $this->frozenDice;
    }

    /**
     * Set frozenDiceTotal
     *
     * @param string $frozenDiceTotal
     *
     * @return GameState
     */
    public function setFrozenDiceTotal($frozenDiceTotal)
    {
        $this->frozenDiceTotal = $frozenDiceTotal;

        return $this;
    }

    /**
     * Get frozenDiceTotal
     *
     * @return string
     */
    public function getFrozenDiceTotal()
    {
        return $this->frozenDiceTotal;
    }

    /**
     * Set gameStatus
     *
     * @param string $gameStatus
     *
     * @return GameState
     */
    public function setGameStatus($gameStatus)
    {
        $this->gameStatus = $gameStatus;

        return $this;
    }

    /**
     * Get gameStatus
     *
     * @return string
     */
    public function getGameStatus()
    {
        return $this->gameStatus;
    }

    /**
     * Set playerMessage
     *
     * @param string $playerMessage
     *
     * @return GameState
     */
    public function setPlayerMessage($playerMessage)
    {
        $this->playerMessage = $playerMessage;

        return $this;
    }

    /**
     * Get playerMessage
     *
     * @return string
     */
    public function getPlayerMessage()
    {
        return $this->playerMessage;
    }

    /**
     * Set playerWorms
     *
     * @param string $playerWorms
     *
     * @return GameState
     */
    public function setPlayerWorms($playerWorms)
    {
        $this->playerWorms = $playerWorms;

        return $this;
    }

    /**
     * Get playerWorms
     *
     * @return string
     */
    public function getPlayerWorms()
    {
        return $this->playerWorms;
    }

    /**
     * Set playerWormsTotals
     *
     * @param string $playerWormsTotals
     *
     * @return GameState
     */
    public function setPlayerWormsTotals($playerWormsTotals)
    {
        $this->playerWormsTotals = $playerWormsTotals;

        return $this;
    }

    /**
     * Get playerWormsTotals
     *
     * @return string
     */
    public function getPlayerWormsTotals()
    {
        return $this->playerWormsTotals;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return GameState
     */
    public function setCreatedAt($createdAt)
    {
        $this->created_at = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }

    /**
     * Set game
     *
     * @param \AppBundle\Entity\Game $game
     *
     * @return GameState
     */
    public function setGame(\AppBundle\Entity\Game $game = null)
    {
        $this->game = $game;

        return $this;
    }

    /**
     * Get game
     *
     * @return \AppBundle\Entity\Game
     */
    public function getGame()
    {
        return $this->game;
    }
    /**
     * @ORM\PrePersist
     */
    public function setCreatedAtValue()
    {
        if(!$this->getCreatedAt())
		{
			$this->created_at = new \DateTime();
		}
    }
}
