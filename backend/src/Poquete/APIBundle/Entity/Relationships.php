<?php

namespace Poquete\APIBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Relationships
 *
 * @ORM\Table(name="Relationships")
 * @ORM\Entity
 */
class Relationships
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_id_1", type="integer", nullable=true)
     */
    private $userId1;

    /**
     * @var integer
     *
     * @ORM\Column(name="user_id_2", type="integer", nullable=true)
     */
    private $userId2;

    /**
     * @var integer
     *
     * @ORM\Column(name="universe_id_1", type="integer", nullable=true)
     */
    private $universeId1;

    /**
     * @var integer
     *
     * @ORM\Column(name="universe_id_2", type="integer", nullable=true)
     */
    private $universeId2;

    /**
     * @var integer
     *
     * @ORM\Column(name="status_1", type="integer", nullable=true)
     */
    private $status1;

    /**
     * @var integer
     *
     * @ORM\Column(name="status_2", type="integer", nullable=true)
     */
    private $status2;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime", nullable=true)
     */
    private $date;


}
