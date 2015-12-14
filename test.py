from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

driver = webdriver.Firefox()
driver.get("file:///Users/renhua/Documents/AI-Implementation-for-MineSweeper/html/play.html")

counter = 0
index = 0
while index < 100:
	button1 = driver.find_element_by_id("hard")
	button1.click()

	button2 = driver.find_element_by_id("autoPlay")
	button2.click()

	element = driver.find_element_by_id('timer')
	content = element.get_attribute('innerHTML')

	index += 1

	if "Congratulations" in content:
		counter += 1

	time.sleep(2)

print "You win " + str(counter) + " in 100 times" 