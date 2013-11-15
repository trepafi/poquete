<?php

namespace Poquete\APIBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Usersprivacies
 *
 * @ORM\Table(name="UsersPrivacies")
 * @ORM\Entity
 */
class Usersprivacies
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
     * @var string
     *
     * @ORM\Column(name="value", type="string", length=100, nullable=true)
     */
    private $value;

    /**
     * @var \Privacies
     *
     * @ORM\ManyToOne(targetEntity="Privacies")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="privacy_id", referencedColumnName="id")
     * })
     */
    private $privacy;

    /**
     * @var \Users
     *
     * @ORM\ManyToOne(targetEntity="Users")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     * })
     */
    private $user;


}
