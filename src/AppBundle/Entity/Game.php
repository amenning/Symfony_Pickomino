<?php

namespace AppBundle\Entity;

/**
 * Game
 */
class Game
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var \DateTime
     */
    private $created_at;

    /**
     * @var \DateTime
     */
    private $updated_at;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $game_states;

    /**
     * @var \AppBundle\Entity\Player
     */
    private $player;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->game_states = new \Doctrine\Common\Collections\ArrayCollection();
    }

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
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Game
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
     * Set updatedAt
     *
     * @param \DateTime $updatedAt
     *
     * @return Game
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updated_at = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return \DateTime
     */
    public function getUpdatedAt()
    {
        return $this->updated_at;
    }

    /**
     * Add gameState
     *
     * @param \AppBundle\Entity\GameState $gameState
     *
     * @return Game
     */
    public function addGameState(\AppBundle\Entity\GameState $gameState)
    {
        $this->game_states[] = $gameState;

        return $this;
    }

    /**
     * Remove gameState
     *
     * @param \AppBundle\Entity\GameState $gameState
     */
    public function removeGameState(\AppBundle\Entity\GameState $gameState)
    {
        $this->game_states->removeElement($gameState);
    }

    /**
     * Get gameStates
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getGameStates()
    {
        return $this->game_states;
    }

    /**
     * Set player
     *
     * @param \AppBundle\Entity\Player $player
     *
     * @return Game
     */
    public function setPlayer(\AppBundle\Entity\Player $player = null)
    {
        $this->player = $player;

        return $this;
    }

    /**
     * Get player
     *
     * @return \AppBundle\Entity\Player
     */
    public function getPlayer()
    {
        return $this->player;
    }
    /**
     * @ORM\PrePersist
     */
    public function setCreatedAtValue()
    {
        // Add your code here
    }

    /**
     * @ORM\PreUpdate
     */
    public function setUpdatedAtValue()
    {
        // Add your code here
    }
}

