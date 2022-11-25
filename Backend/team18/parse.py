import requests
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import os
from selenium.webdriver.chrome.options import Options
import re
import csv

os.environ.setdefault("DJANGO_SETTINGS_MODULE","team18.settings")

import django
django.setup()

from ooo.models import Outfit, SampleCloth, LabelSet

#코디에 속해있는 옷 링크(테스트 용)
cloth_list = []
top_cloth_data_list =[]
bottom_cloth_data_list =[]
outer_cloth_data_list =[]
codi_data_list = []
error_link = []
error_top_cloth_link = []
error_bottom_cloth_link=[]
error_outer_cloth_link=[]
# 코디 데이터 파싱

def parse_outfit_data():
        
    driver = webdriver.Chrome()
    time.sleep(5)
    driver.implicitly_wait(2)
    LOADING_TIME = 15
    for i in range(81,91): # 뒷 페이지 가는 버튼 있을 때까지. 10페이지만으로 바꿈. 214까지 있음.
        driver.get("https://www.musinsa.com/app/styles/lists?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page={}".format(i))
        time.sleep(5)
        driver.implicitly_wait(LOADING_TIME)
        driver.find_element('xpath','/html/body/div[3]/div[3]/div[1]/button[2]').click()
        time.sleep(5)
        driver.implicitly_wait(LOADING_TIME)
        codi_li = driver.find_elements("class name","style-list-item__thumbnail")
        list_num = 1
        codi_name_list = driver.find_elements("class name","style-list-information__title")
        for li in codi_li: # 한 페이지에 있는 코디 사진 모두 접근
            # 조회 수
            try:
                codi_li = driver.find_elements("class name","style-list-item__thumbnail")
                codi_name_list = driver.find_elements("class name","style-list-information__title")
                print(len(driver.find_elements('class name', 'post-information__text')))
                rank = driver.find_elements("class name","post-information")[list_num-1].find_elements('tag name','span')[1].text
                rank = re.sub(r'[^0-9]','',rank)
                print(rank)
                codi_name = codi_name_list[list_num-1].text
                print(codi_name)
                # 코디 이미지
                codi_image = driver.find_elements('class name',"style-list-thumbnail__img")[list_num-1].get_attribute("src")
                driver.find_elements('class name',"style-list-item__link")[list_num-1].click()
                time.sleep(5)
                driver.implicitly_wait(LOADING_TIME)
                # 코디 설명
                explain = driver.find_element('class name',"styling_txt").text
                # 코디 링크
                codi_link = driver.current_url
                
                # 코디 구성 옷 리스트
                try:
                    cloth_list_num = driver.find_elements('class name',"styling_img")
                    cloth_links = []
                    for c in cloth_list_num: # 하나의 코디를 이루는 옷 링크 모으기.
                        try:
                            c.click() 
                            driver.implicitly_wait(LOADING_TIME)
                            store = False
                            #상의, 바지, 아우터일 경우에만 옷 저장
                            for cloth_type in driver.find_elements("xpath","//*[@id=\"page_product_detail\"]/div[3]/div[3]/div[1]/p/a"):
                                if (cloth_type.text.strip() == '상의' or cloth_type.text.strip() == '바지' or cloth_type.text.strip() == '아우터'):
                                    store = True
                                    print(cloth_type.text)
                            if store:
                                url = str(driver.current_url)
                                cloth_links.append(url)
                                with open('cloth_list.csv','a', encoding='utf-8', newline='') as cloth_list_csvfile:
                                    wr = csv.writer(cloth_list_csvfile)
                                    wr.writerow([url])
                                print(url)
                                print(cloth_links)
                            driver.back()
                            time.sleep(5)
                            driver.implicitly_wait(LOADING_TIME)
                            cloth_list_num = driver.find_elements('class name',"styling_img")
                        except Exception as e:
                            print(e)
                            pass 
                    driver.back()
                    time.sleep(5)
                    driver.implicitly_wait(LOADING_TIME)
                    list_num += 1
                    print(cloth_links)
                    codi_data_list.append({'codi_name':codi_name,'rank':rank, 'explain':explain, 'codi_link':codi_link, 'cloth_links':cloth_links, 'codi_image':codi_image})
                    print(codi_data_list[len(codi_data_list)-1])
                    with open('codi_data.csv','a', encoding='utf-8', newline='') as codi_csvfile:
                        fieldnames = ['codi_name','rank', 'explain', 'codi_link', 'cloth_links','codi_image']
                        wr = csv.DictWriter(codi_csvfile, fieldnames=fieldnames)
                        wr.writerow(codi_data_list[len(codi_data_list)-1])
                    codi_li = driver.find_elements("class name","style-list-item__thumbnail")
                    codi_name_list = driver.find_elements("class name","style-list-information__title")
                except Exception as e:
                    print(e)
                    error_link.append({'link':driver.current_url, 'number':list_num, 'page': i})
                    with open('error_link.csv','a', encoding='utf-8', newline='') as error_link_csvfile:
                        fieldnames = ['link', 'number', 'page']
                        wr = csv.DictWriter(error_link_csvfile, fieldnames=fieldnames)
                        wr.writerow(error_link[len(error_link)-1])
                    pass
            except Exception as e:
                print(e)
                error_link.append({'link':driver.current_url, 'number':list_num, 'page': i})
                with open('error_link.csv','a', encoding='utf-8', newline='') as error_link_csvfile:
                    fieldnames = ['link', 'number', 'page']
                    wr = csv.DictWriter(error_link_csvfile, fieldnames=fieldnames)
                    wr.writerow(error_link[len(error_link)-1])
                pass
    driver.quit()
            # 코디 데이터 저장 (아직 테스트 불가)
            # Outfit.create(outfit_info = explain, popularity = rank, img = codi_image, purchase_link = codi_link, cloth_list = cloth_links)

# 옷 데이터 파싱 저장할 때 코디 데이터랑 연결, label set 만들어줘야함.
def parse_top_cloth_data():
    
    cloth_list = csv_to_list('cloth_list.csv')
    #cloth_list = ['https://www.musinsa.com/app/goods/2149254','https://www.musinsa.com/app/goods/659554']
    print(cloth_list)
    driver = webdriver.Chrome()
    driver.implicitly_wait(2)
    
    LOADING_TIME = 15
    # 상의 페이지로 들어감.
    driver.get("https://www.musinsa.com/categories/item/001")
    time.sleep(5)
    driver.implicitly_wait(LOADING_TIME)
    driver.find_element('xpath','/html/body/div[2]/div[3]/div[13]/button[2]').click()
    time.sleep(5)
    driver.implicitly_wait(LOADING_TIME)
    # 상의 색깔별로 들어감. 
    color_num = 1
    for li in driver.find_elements('xpath','//*[@id="toolTip"]/li'):
        try:
            cloth_color = color_num
            li.click()
            time.sleep(5)
            driver.implicitly_wait(LOADING_TIME)
            #색상 별 총 페이지 수
            page_cnt = int(driver.find_element('class name',"totalPagingNum").text)
            #이제부터 상의-색상별 의상 페이지 이동
            for c in range(1,page_cnt+1):
                #해당 페이지의 옷들 접근
                try:
                    driver.get('https://www.musinsa.com/categories/item/001?d_cat_cd=001&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                    time.sleep(5)
                    driver.implicitly_wait(LOADING_TIME)
                    driver.find_element('xpath','/html/body/div[2]/div[3]/div[13]/button[2]').click()
                    time.sleep(5)
                    driver.implicitly_wait(LOADING_TIME)
                    cloth_cnt = len(driver.find_elements('xpath','//*[@id="searchList"]/li'))
                    print(cloth_cnt, flush=True)
                    
                    for l in range(1,cloth_cnt+1):
                        try:
                            print(l,flush=True)
                        
                            driver.get('https://www.musinsa.com/categories/item/001?d_cat_cd=001&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                            time.sleep(5)
                            driver.implicitly_wait(LOADING_TIME)
                            #cloth_num = int(driver.find_element('xpath','//*[@id="searchList"]/li[{}]'.format(l)).get_attribute('data-no'))
                            driver.find_elements('name','goods_link')[2*(l-1)].click()
                            print("/",flush=True)
                            time.sleep(5)
                            driver.implicitly_wait(LOADING_TIME)
                            cloth_link = str(driver.current_url)
                            if any(cloth_link == s for s in cloth_list):
                                cloth_type = driver.find_element('class name','item_categories').find_elements('tag name', 'a')[1].text
                                cloth_image = driver.find_element('class name','plus_cursor').get_attribute("src")
                                cloth_name = driver.find_element('xpath','//*[@id="page_product_detail"]/div[3]/div[3]/span/em').text
                                if cloth_name.__contains__('체크'):
                                    cloth_pattern = '체크'
                                elif cloth_name.__contains__('스트라이프'):
                                    cloth_pattern = '스트라이프'
                                elif cloth_name.__contains__('자수'):
                                    cloth_pattern = '자수'
                                elif cloth_name.__contains__('로고'):
                                    cloth_pattern = '로고'
                                else:
                                    cloth_pattern = 'None'
                                top_cloth_data_list.append({'cloth_color':cloth_color, 'cloth_name':cloth_name, 'cloth_link':cloth_link, 'cloth_image':cloth_image, 'cloth_pattern':cloth_pattern, 'cloth_type':cloth_type})
                                with open('top_cloth_data.csv','a', encoding='utf-8', newline='') as top_cloth_csvfile:
                                    fieldnames = ['cloth_color', 'cloth_name', 'cloth_link', 'cloth_image', 'cloth_pattern', 'cloth_type']
                                    wr = csv.DictWriter(top_cloth_csvfile, fieldnames=fieldnames)
                                    wr.writerow(top_cloth_data_list[len(top_cloth_data_list)-1])
                                print(top_cloth_data_list[len(top_cloth_data_list)-1])
                                #outfit이랑 label set 찾고 저장
                                # outfits = Outfit.filter(cloth_list.__contains__(cloth_link))
                                # label = LabelSet.get_or_create(type = cloth_type, color = cloth_color, pattern = cloth_pattern)
                                # SampleCloth(name = cloth_name, img = cloth_image, purchase_link = cloth_link, outfit = outfits, type = cloth_type, color = cloth_color, pattern = cloth_pattern, label_set = label)
                            else:
                                print("No")
                        except Exception as e:
                            print(e)
                            error_top_cloth_link.append({'link':driver.current_url, 'number':l, 'page': c,  'color':cloth_color})
                            with open('error_top_cloth_link.csv','a', encoding='utf-8', newline='') as error_top_cloth_link_csvfile:
                                fieldnames = ['link', 'number', 'page', 'color']
                                wr = csv.DictWriter(error_top_cloth_link_csvfile, fieldnames=fieldnames)
                                wr.writerow(error_top_cloth_link[len(error_top_cloth_link)-1])
                            pass
                except Exception as e:
                    print(e)
                    error_top_cloth_link.append({'link':driver.current_url, 'number':l, 'page': c,  'color':cloth_color})
                    with open('error_top_cloth_link.csv','a', encoding='utf-8', newline='') as error_top_cloth_link_csvfile:
                        fieldnames = ['link', 'number', 'page', 'color']
                        wr = csv.DictWriter(error_top_cloth_link_csvfile, fieldnames=fieldnames)
                        wr.writerow(error_top_cloth_link[len(error_top_cloth_link)-1])
                    pass
        except Exception as e:
            print(e)
            error_top_cloth_link.append({'link':driver.current_url, 'number':l, 'page': c,  'color':cloth_color})
            with open('error_top_cloth_link.csv','a', encoding='utf-8', newline='') as error_top_cloth_link_csvfile:
                fieldnames = ['link', 'number', 'page', 'color']
                wr = csv.DictWriter(error_top_cloth_link_csvfile, fieldnames=fieldnames)
                wr.writerow(error_top_cloth_link[len(error_top_cloth_link)-1])
            pass
        color_num+=1
    driver.quit()
        
def parse_bottom_cloth_data():
    
    cloth_list = csv_to_list('cloth_list.csv')
    
    driver = webdriver.Chrome()
    driver.implicitly_wait(2)
    
    LOADING_TIME = 15
    # 상의 페이지로 들어감.
    driver.get("https://www.musinsa.com/categories/item/003")
    time.sleep(5)
    driver.implicitly_wait(LOADING_TIME)
    driver.find_element('xpath','/html/body/div[2]/div[3]/div[13]/button[2]').click()
    time.sleep(5)
    driver.implicitly_wait(LOADING_TIME)
    # 상의 색깔별로 들어감. 
    color_num = 1
    for li in driver.find_elements('xpath','//*[@id="toolTip"]/li'):
        try:
            cloth_color = color_num
            li.click()
            time.sleep(5)
            driver.implicitly_wait(LOADING_TIME)
            #색상 별 총 페이지 수
            page_cnt = int(driver.find_element('class name',"totalPagingNum").text)
            #이제부터 상의-색상별 의상 페이지 이동
            for c in range(1,page_cnt+1):
                #해당 페이지의 옷들 접근
                try:
                    driver.get('https://www.musinsa.com/categories/item/003?d_cat_cd=003&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                    time.sleep(5)
                    driver.implicitly_wait(LOADING_TIME)
                    driver.find_element('xpath','/html/body/div[2]/div[3]/div[13]/button[2]').click()
                    time.sleep(5)
                    driver.implicitly_wait(LOADING_TIME)
                    cloth_cnt = len(driver.find_elements('xpath','//*[@id="searchList"]/li'))
                    print(cloth_cnt, flush=True)
                    
                    for l in range(1,cloth_cnt+1):
                        try:
                            print(l,flush=True)
                        
                            driver.get('https://www.musinsa.com/categories/item/003?d_cat_cd=003&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                            time.sleep(5)
                            driver.implicitly_wait(LOADING_TIME)
                            #cloth_num = int(driver.find_element('xpath','//*[@id="searchList"]/li[{}]'.format(l)).get_attribute('data-no'))
                            driver.find_elements('name','goods_link')[2*(l-1)].click()
                            time.sleep(5)
                            driver.implicitly_wait(LOADING_TIME)
                            cloth_link = str(driver.current_url)
                            if any(cloth_link == s for s in cloth_list):
                                cloth_type = driver.find_element('class name','item_categories').find_elements('tag name', 'a')[1].text
                                cloth_image = driver.find_element('class name','plus_cursor').get_attribute("src")
                                cloth_name = driver.find_element('xpath','//*[@id="page_product_detail"]/div[3]/div[3]/span/em').text
                                if cloth_name.__contains__('체크'):
                                    cloth_pattern = '체크'
                                elif cloth_name.__contains__('스트라이프'):
                                    cloth_pattern = '스트라이프'
                                elif cloth_name.__contains__('자수'):
                                    cloth_pattern = '자수'
                                elif cloth_name.__contains__('로고'):
                                    cloth_pattern = '로고'
                                else:
                                    cloth_pattern = 'None'
                                bottom_cloth_data_list.append({'cloth_color':cloth_color, 'cloth_name':cloth_name, 'cloth_link':cloth_link, 'cloth_image':cloth_image, 'cloth_pattern':cloth_pattern, 'cloth_type':cloth_type})
                                with open('bottom_cloth_data.csv','a', encoding='utf-8', newline='') as bottom_cloth_csvfile:
                                    fieldnames = ['cloth_color', 'cloth_name', 'cloth_link', 'cloth_image', 'cloth_pattern', 'cloth_type']
                                    wr = csv.DictWriter(bottom_cloth_csvfile, fieldnames=fieldnames)
                                    wr.writerow(bottom_cloth_data_list[len(bottom_cloth_data_list)-1])
                                print(bottom_cloth_data_list[len(bottom_cloth_data_list)-1])
                                #outfit이랑 label set 찾고 저장
                                # outfits = Outfit.filter(cloth_list.__contains__(cloth_link))
                                # label = LabelSet.get_or_create(type = cloth_type, color = cloth_color, pattern = cloth_pattern)
                                # SampleCloth(name = cloth_name, img = cloth_image, purchase_link = cloth_link, outfit = outfits, type = cloth_type, color = cloth_color, pattern = cloth_pattern, label_set = label)
                            else:
                                print("No")
                        except Exception as e:
                            print(e)
                            error_bottom_cloth_link.append({'link':driver.current_url, 'number':l, 'page': c,  'color':cloth_color})
                            with open('error_bottom_cloth_link.csv','a', encoding='utf-8', newline='') as error_bottom_cloth_link_csvfile:
                                fieldnames = ['link', 'number', 'page', 'color']
                                wr = csv.DictWriter(error_bottom_cloth_link_csvfile, fieldnames=fieldnames)
                                wr.writerow(error_bottom_cloth_link[len(error_bottom_cloth_link)-1])
                            pass
                except Exception as e:
                    print(e)
                    error_bottom_cloth_link.append({'link':driver.current_url, 'number':l, 'page': c,  'color':cloth_color})
                    with open('error_bottom_cloth_link.csv','a', encoding='utf-8', newline='') as error_bottom_cloth_link_csvfile:
                        fieldnames = ['link', 'number', 'page', 'color']
                        wr = csv.DictWriter(error_bottom_cloth_link_csvfile, fieldnames=fieldnames)
                        wr.writerow(error_bottom_cloth_link[len(error_bottom_cloth_link)-1])
                    pass
        except Exception as e:
            print(e)
            error_bottom_cloth_link.append({'link':driver.current_url, 'number':l, 'page': c,  'color':cloth_color})
            with open('error_bottom_cloth_link.csv','a', encoding='utf-8', newline='') as error_bottom_cloth_link_csvfile:
                fieldnames = ['link', 'number', 'page', 'color']
                wr = csv.DictWriter(error_bottom_cloth_link_csvfile, fieldnames=fieldnames)
                wr.writerow(error_bottom_cloth_link[len(error_bottom_cloth_link)-1])
            pass
        color_num+=1
    driver.quit()
                    
def parse_outer_cloth_data():
    
    cloth_list = csv_to_list('cloth_list.csv')
    
    driver = webdriver.Chrome()
    driver.implicitly_wait(2)
    
    LOADING_TIME = 15
    # 상의 페이지로 들어감.
    driver.get("https://www.musinsa.com/categories/item/002")
    time.sleep(5)
    driver.implicitly_wait(LOADING_TIME)
    driver.find_element('xpath','/html/body/div[2]/div[3]/div[13]/button[2]').click()
    time.sleep(5)
    driver.implicitly_wait(LOADING_TIME)
    # 상의 색깔별로 들어감. 
    color_num = 1
    for li in driver.find_elements('xpath','//*[@id="toolTip"]/li'):
        try:
            cloth_color = color_num
            li.click()
            time.sleep(5)
            driver.implicitly_wait(LOADING_TIME)
            #색상 별 총 페이지 수
            page_cnt = int(driver.find_element('class name',"totalPagingNum").text)
            #이제부터 상의-색상별 의상 페이지 이동
            for c in range(1,page_cnt+1):
                #해당 페이지의 옷들 접근
                try:
                    driver.get('https://www.musinsa.com/categories/item/002?d_cat_cd=002&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                    time.sleep(5)
                    driver.implicitly_wait(LOADING_TIME)
                    driver.find_element('xpath','/html/body/div[2]/div[3]/div[13]/button[2]').click()
                    time.sleep(5)
                    driver.implicitly_wait(LOADING_TIME)
                    cloth_cnt = len(driver.find_elements('xpath','//*[@id="searchList"]/li'))
                    print(cloth_cnt, flush=True)
                    
                    for l in range(1,cloth_cnt+1):
                        try:
                            print(l,flush=True)
                        
                            driver.get('https://www.musinsa.com/categories/item/002?d_cat_cd=002&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                            time.sleep(5)
                            driver.implicitly_wait(LOADING_TIME)
                            #cloth_num = int(driver.find_element('xpath','//*[@id="searchList"]/li[{}]'.format(l)).get_attribute('data-no'))
                            driver.find_elements('name','goods_link')[2*(l-1)].click()
                            time.sleep(5)
                            driver.implicitly_wait(LOADING_TIME)
                            cloth_link = str(driver.current_url)
                            if any(cloth_link == s for s in cloth_list):
                                cloth_type = driver.find_element('class name','item_categories').find_elements('tag name', 'a')[1].text
                                cloth_image = driver.find_element('class name','plus_cursor').get_attribute("src")
                                cloth_name = driver.find_element('xpath','//*[@id="page_product_detail"]/div[3]/div[3]/span/em').text
                                if cloth_name.__contains__('체크'):
                                    cloth_pattern = '체크'
                                elif cloth_name.__contains__('스트라이프'):
                                    cloth_pattern = '스트라이프'
                                elif cloth_name.__contains__('자수'):
                                    cloth_pattern = '자수'
                                elif cloth_name.__contains__('로고'):
                                    cloth_pattern = '로고'
                                else:
                                    cloth_pattern = 'None'
                                outer_cloth_data_list.append({'cloth_color':cloth_color, 'cloth_name':cloth_name, 'cloth_link':cloth_link, 'cloth_image':cloth_image, 'cloth_pattern':cloth_pattern, 'cloth_type':cloth_type})
                                with open('outer_cloth_data.csv','a', encoding='utf-8', newline='') as outer_cloth_csvfile:
                                    fieldnames = ['cloth_color', 'cloth_name', 'cloth_link', 'cloth_image', 'cloth_pattern', 'cloth_type']
                                    wr = csv.DictWriter(outer_cloth_csvfile, fieldnames=fieldnames)
                                    wr.writerow(outer_cloth_data_list[len(outer_cloth_data_list)-1])
                                print(outer_cloth_data_list[len(outer_cloth_data_list)-1])
                                #outfit이랑 label set 찾고 저장
                                # outfits = Outfit.filter(cloth_list.__contains__(cloth_link))
                                # label = LabelSet.get_or_create(type = cloth_type, color = cloth_color, pattern = cloth_pattern)
                                # SampleCloth(name = cloth_name, img = cloth_image, purchase_link = cloth_link, outfit = outfits, type = cloth_type, color = cloth_color, pattern = cloth_pattern, label_set = label)
                            else:
                                print("No")
                        except Exception as e:
                            print(e)
                            error_outer_cloth_link.append({'link':driver.current_url, 'number':l, 'page': c,  'color':cloth_color})
                            with open('error_outer_cloth_link.csv','a', encoding='utf-8', newline='') as error_outer_cloth_link_csvfile:
                                fieldnames = ['link', 'number', 'page', 'color']
                                wr = csv.DictWriter(error_outer_cloth_link_csvfile, fieldnames=fieldnames)
                                wr.writerow(error_outer_cloth_link[len(error_outer_cloth_link)-1])
                            pass
                except Exception as e:
                    print(e)
                    error_outer_cloth_link.append({'link':driver.current_url, 'number':l, 'page': c,  'color':cloth_color})
                    with open('error_outer_cloth_link.csv','a', encoding='utf-8', newline='') as error_outer_cloth_link_csvfile:
                        fieldnames = ['link', 'number', 'page', 'color']
                        wr = csv.DictWriter(error_outer_cloth_link_csvfile, fieldnames=fieldnames)
                        wr.writerow(error_outer_cloth_link[len(error_outer_cloth_link)-1])
                    pass
        except Exception as e:
            print(e)
            error_outer_cloth_link.append({'link':driver.current_url, 'number':l, 'page': c,  'color':cloth_color})
            with open('error_outer_cloth_link.csv','a', encoding='utf-8', newline='') as error_outer_cloth_link_csvfile:
                fieldnames = ['link', 'number', 'page', 'color']
                wr = csv.DictWriter(error_outer_cloth_link_csvfile, fieldnames=fieldnames)
                wr.writerow(error_outer_cloth_link[len(error_outer_cloth_link)-1])
            pass
        color_num+=1
    driver.quit()
    
    #얘를 csv_to_db 로 바꿔야 함.
#def list_to_csv():
#    df_outfit = pd.DataFrame(codi_data_list)
#    df_top = pd.DataFrame(top_cloth_data_list)
#    df_bottom = pd.DataFrame(bottom_cloth_data_list)
#    df_outer = pd.DataFrame(outer_cloth_data_list)
#    print(df_outfit.head(5))
#    df_outfit.to_csv("codi_data.csv",encoding='utf-8-sig')
#    df_top.to_csv("top_cloth_data.csv",encoding='utf-8-sig')
#    df_bottom.to_csv("bottom_cloth_data.csv",encoding='utf-8-sig')
#    df_outer.to_csv("outer_cloth_data.csv",encoding='utf-8-sig')

def csv_to_db(file_name):
    if file_name == 'codi_data.csv':
        df = open(file_name, 'r', encoding='utf-8-sig')
        dic_list = csv.DictReader(df)
        for dic in dic_list:
            print(dic)
            outfit = Outfit(outfit_name=dic['codi_name'], outfit_info=dic['explain'], popularity=dic['rank'], image_link = dic['codi_image'], purchase_link = dic['codi_link'])
            outfit.save()
    else:
        df = open(file_name, 'r', encoding='utf-8-sig')
        dic_list = csv.DictReader(df)
        df_codi = open('codi_data.csv','r',encoding='utf-8-sig')
        outfits = csv.DictReader(df_codi)
        for dic in dic_list:
            color = ""
            print(dic)
            if dic['cloth_color'] == 1:
                color = '흰색'
            elif dic['cloth_color'] == 2:
                color = '검정색'
            elif dic['cloth_color'] == 3:
                color = '회색'
            elif dic['cloth_color'] == 4:
                color = '갈색'
            elif dic['cloth_color'] == 5:
                color = '베이지색'
            elif dic['cloth_color'] == 6:
                color = '녹색'
            elif dic['cloth_color'] == 7:
                color = '파란색'
            elif dic['cloth_color'] == 8:
                color = '보라색'
            elif dic['cloth_color'] == 9:
                color = '노란색'
            elif dic['cloth_color'] == 10:
                color = '분홍색'
            elif dic['cloth_color'] == 11:
                color = '빨간색'
            elif dic['cloth_color'] == 12:
                color = '주황색'
            elif dic['cloth_color'] == 13:
                color = '은색'
            elif dic['cloth_color'] == 15:
                color = '기타색상'
            elif dic['cloth_color'] == 16:
                color = '데님'
            elif dic['cloth_color'] == 23:
                color = '아이보리'
            elif dic['cloth_color'] == 24:
                color = '라이트 그레이'
            elif dic['cloth_color'] == 25:
                color = '다크 그레이'
            elif dic['cloth_color'] == 26:
                color = '카멜'
            elif dic['cloth_color'] == 28:
                color = '카키 베이지'
            elif dic['cloth_color'] == 29:
                color = '샌드'
            elif dic['cloth_color'] == 30:
                color = '카키'
            elif dic['cloth_color'] == 31:
                color = '라이트 그린'
            elif dic['cloth_color'] == 32:
                color = '민트'
            elif dic['cloth_color'] == 34:
                color = '올리브 그린'
            elif dic['cloth_color'] == 35:
                color = '다크 그린'
            elif dic['cloth_color'] == 36:
                color = '네이비'
            elif dic['cloth_color'] == 37:
                color = '스카이 블루'
            elif dic['cloth_color'] == 39:
                color = '라벤더'
            elif dic['cloth_color'] == 44:
                color = '라이트 옐로우'
            elif dic['cloth_color'] == 45:
                color = '라이트 핑크'
            elif dic['cloth_color'] == 48:
                color = '페일 핑크'
            elif dic['cloth_color'] == 49:
                color = '버건디'
            elif dic['cloth_color'] == 51:
                color = '딥레드'
            elif dic['cloth_color'] == 56:
                color = '로즈골드'
            elif dic['cloth_color'] == 57:
                color = '연청'
            elif dic['cloth_color'] == 58:
                color = '중청'
            elif dic['cloth_color'] == 59:
                color = '진청'
            elif dic['cloth_color'] == 60:
                color = '흑청'
            label, created = LabelSet.objects.get_or_create(type = dic['cloth_type'], color = color, pattern = dic['cloth_pattern'])
            label.save()
            outfit_list = []
            string = dic['cloth_link']
            for outfit in outfits:
                if string in outfit['cloth_links']:
                    print('y')
                    for list in Outfit.objects.filter(purchase_link = outfit['codi_link']):
                        outfit_list.append(list)
            print(outfit_list)
            sample_cloth = SampleCloth(name = dic['cloth_name'], image_link = dic['cloth_image'], purchase_link = dic['cloth_link'], type = dic['cloth_type'], color = color, pattern = dic['cloth_pattern'], label_set = label)
            sample_cloth.save()
            sample_cloth.outfit.set(outfit_list)
            sample_cloth.save()
            print("save")
    ##이슈
    # sample cloth에 outfit 리스트로 들어가야함.
    # outfit에 구성 옷의 링크 리스트 추가 -> 옷 저장할 때 코디 찾으려면 해야함.
    
def csv_to_list(filename):
    f = open(filename, 'r', encoding='utf-8-sig')
    csvfile = csv.reader(f)
    lists = []
    for item in csvfile:
        item = item[0][0:-2]
        lists.append(item)
    return lists

#parse_outfit_data() #코디 데이터 크롤링하는 함수
#parse_top_cloth_data() #상의 데이터 크롤링하는 함수
#parse_outer_cloth_data() #아우터 데이터 크롤링하는 함수
#parse_bottom_cloth_data() #하의 데이터 크롤링하는 함수
#list_to_csv() # list를 csv 파일로 변환하는 함수인데 지금 쓸 필요 없음
#csv_to_list('cloth_list.csv') #csv 파일 list로 변환 변환하고자하는 파일 명 파라미터로 주기.
csv_to_db('codi_data.csv') #csv 파일에 적힌 데이터 db로 옮기기 원하는 csv파일 파라미터로 주기
csv_to_db('top_cloth_data.csv')
csv_to_db('bottom_cloth_data.csv')
csv_to_db('outer_cloth_data.csv')