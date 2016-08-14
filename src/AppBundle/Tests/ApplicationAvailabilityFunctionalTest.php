<?php
namespace AppBundle\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApplicationAvailabilityFunctionalTest extends WebTestCase
{
	/**
	 * @dataProvider urlProvider
	 */
	 public function testGetPageIsSuccessful($url, $statusCode = 200, $targetUrlRegex = null)
	 {
	 	$client = self::createClient();
		$client->request('GET', $url);

		if($statusCode === 200){
			$this->assertTrue($client->getResponse()->isSuccessful());
		} elseif ($statusCode === 301 || $statusCode === 302) {
			$headers = $client->getInternalResponse()->getHeaders();

			$this->assertEquals($client->getResponse()->getStatusCode(), $statusCode);
			$this->assertRegExp($targetUrlRegex,$headers["location"][0]);
		} else {
			// If url behaves unexpectedly, dump attempted url and response status code with content
			var_dump($url);
			var_dump($client->getResponse()->getStatusCode());
			var_dump($client->getResponse()->getContent());
			$this->assertTrue(FALSE);
		}
	 }

	 public function urlProvider()
	 {
	 	return array(
	 		// input GET url, expected status code = 200, expected redirectUrlRegex = null
			array('/', 301, '/home/'),
			array('/home', 302, '/login/'),
			array('/login'),
			array('/logout', 302, '/home/'),
			array('/register', 301, '/register\//'),
			array('/register/'),
			array('/rules'),
			array('/angular_directives/common-footer'),
			array('/angular_directives/common-header'),
			array('/angular_directives/game-active-dice'),
			array('/angular_directives/game-board'),
			array('/angular_directives/game-body'),
			array('/angular_directives/game-frozen-dice'),
			array('/angular_directives/game-grill-worms'),
			array('/angular_directives/game-header'),
			array('/angular_directives/game-login'),
			array('/angular_directives/game-player-options'),
			array('/angular_directives/game-player-worms'),
			array('/angular_directives/game-registration'),
			array('/angular_directives/game-setup'),
			array('/angular_directives/tutorial-board'),
		);
	 }
}