
# from selenium import webdriver
# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.common.by import By
# import time
# # Specify the path to the ChromeDriver executable
# driver_path = './chromedriver.exe'  # Adjust the path as needed
# # Initialize the ChromeDriver using the Service class
# service = Service(driver_path)
# driver = webdriver.Chrome(service=service)
# try:
#     # Open the target website
#     driver.get('https://www.swinburne.edu.au/app/web-course-planners/home/index.php?cp-keyword=a&cp-year-commenced=2023&cp-intake=&cp-course-type=&cp-submit=Search')
#     time.sleep(5)  # Allow time for the page to load
#     click_count = 2  # Track number of clicks
#     while click_count < 5:
#         try:
#             button1 = driver.find_element(By.CSS_SELECTOR, 
#                 '#fillgrid > tr:nth-child(1) > td:nth-child(6) > a')
#             button1.click()
#             time.sleep(1)
#             button2 = driver.find_element(By.CSS_SELECTOR, 
#                 '#fillgrid > tr:nth-child(2) > td:nth-child(6) > a')
#             button2.click()
#             time.sleep(1)
#             button3 = driver.find_element(By.CSS_SELECTOR, 
#                 '#fillgrid > tr:nth-child(3) > td:nth-child(6) > a')
#             button3.click()
#             time.sleep(1)
#             button4 = driver.find_element(By.CSS_SELECTOR, 
#                 '#fillgrid > tr:nth-child(4) > td:nth-child(6) > a')
#             button4.click()
#             time.sleep(1)
#             button5 = driver.find_element(By.CSS_SELECTOR, 
#                 '#fillgrid > tr:nth-child(5) > td:nth-child(6) > a')
#             button5.click()
#             time.sleep(1)
#             button6 = driver.find_element(By.CSS_SELECTOR, 
#                 '#fillgrid > tr:nth-child(6) > td:nth-child(6) > a')
#             button6.click()
#             time.sleep(1)
#             button7 = driver.find_element(By.CSS_SELECTOR, 
#                 '#fillgrid > tr:nth-child(7) > td:nth-child(6) > a')
#             button7.click()
#             time.sleep(1)
#             button8 = driver.find_element(By.CSS_SELECTOR, 
#                 '#fillgrid > tr:nth-child(8) > td:nth-child(6) > a')
#             button8.click()
#             time.sleep(1)
#             button9 = driver.find_element(By.CSS_SELECTOR, 
#                 '#fillgrid > tr:nth-child(9) > td:nth-child(6) > a')
#             button9.click()
#             time.sleep(1)
            
#             url = f'https://www.swinburne.edu.au/app/web-course-planners/home/{click_count}/?cp-keyword=a&cp-year-commenced=2023&cp-intake=&cp-course-type=&cp-submit=Search&'
#             driver.get(url)
#             # nextbutton = driver.find_element(By.CSS_SELECTOR, 
#             #     '#content-col > div:nth-child(15) > div.pagination-nav > a:nth-child(6)')
#             # nextbutton.click
#             click_count += 1
#             time.sleep(6)  # Prevents aggressive clicking
#         except Exception as e:
#             print(f"Click {click_count + 1} failed: {e}")
#             break  # Stop clicking if the button is not found
#     print("Completed 132 clicks. Waiting for 5 minutes...")
#     time.sleep(300)  # 5 minutes sleep after clicking
# except Exception as e:
#     print(f"An error occurred: {e}")
#     print("Keeping browser open for 5 minutes before quitting...")
#     time.sleep(300)  # If the application crashes, wait 5 minutes
# finally:
#     driver.quit()
