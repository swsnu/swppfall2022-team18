# -*- coding: utf-8 -*-

import requests
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import os
from selenium.webdriver.chrome.options import Options
import re
import csv
import pandas as pd

os.environ.setdefault("DJANGO_SETTINGS_MODULE","team18.settings")

import django
django.setup()

from ooo.models import Outfit, SampleCloth, LabelSet, UserCloth

#코디에 속해있는 옷 링크(테스트 용)
# cloth_list = []
# top_cloth_data_list =[]
# bottom_cloth_data_list =[]
# outer_cloth_data_list =[]
# codi_data_list = []
# error_link = []
# error_top_cloth_link = []
# error_bottom_cloth_link=[]
# error_outer_cloth_link=[]
# # 코디 데이터 파싱

def parse_outfit_data():
        

    driver = webdriver.Chrome()
    time.sleep(3)
    driver.implicitly_wait(2)
    LOADING_TIME = 15
    for i in range(1,11): # 뒷 페이지 가는 버튼 있을 때까지. 10페이지만으로 바꿈. 214까지 있음.
        driver.get("https://www.musinsa.com/app/styles/lists?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page={}".format(i))
        time.sleep(3)
        driver.implicitly_wait(LOADING_TIME)

        driver.find_element('xpath','/html/body/div[3]/div[3]/div[1]/button[2]').click()
        time.sleep(3)
        driver.implicitly_wait(LOADING_TIME)
        codi_li = driver.find_elements("class name","style-list-item__thumbnail")
        list_num = 1
        codi_name_list = driver.find_elements("class name","style-list-information__title")
        for li in codi_li: # 한 페이지에 있는 코디 사진 모두 접근
            # 조회 수
            try:
                codi_li = driver.find_elements("class name","style-list-item__thumbnail")
                codi_name_list = driver.find_elements("class name","style-list-information__title")

                rank = driver.find_elements("class name","post-information")[list_num-1].find_elements('tag name','span')[1].text
                rank = re.sub(r'[^0-9]','',rank)
                print(rank)
                codi_name = codi_name_list[list_num-1].text
                print(codi_name)
                # 코디 이미지
                codi_image = driver.find_elements('class name',"style-list-thumbnail__img")[list_num-1].get_attribute("src")
                driver.find_elements('class name',"style-list-item__link")[list_num-1].click()
                time.sleep(3)
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
                        top_cloth_data_list=[]
                        bottom_cloth_data_list=[]
                        outer_cloth_data_list=[]
                        try:
                            c.click() 
                            driver.implicitly_wait(LOADING_TIME)
                            store = False
                            #상의, 바지, 아우터일 경우에만 옷 저장
                            cloth_class = driver.find_element('class name','item_categories').find_elements('tag name', 'a')[0].text
                            if (cloth_class.strip() == '상의' or cloth_class.strip() == '바지' or cloth_class.strip() == '아우터'):
                                store = True
                                print(cloth_class, flush=True)
                            if store:
                                cloth_link = str(driver.current_url)
                                cloth_type = driver.find_element('class name','item_categories').find_elements('tag name', 'a')[1].text
                                cloth_image = driver.find_element('class name','plus_cursor').get_attribute("src")
                                cloth_name = driver.find_element('xpath','//*[@id="page_product_detail"]/div[3]/div[3]/span/em').text
                                print(cloth_type  + '/' +cloth_name, flush=True)
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
                                if cloth_class.strip()=='상의':
                                    top_cloth_data_list.append({'cloth_name':cloth_name, 'cloth_link':cloth_link, 'cloth_image':cloth_image, 'cloth_pattern':cloth_pattern, 'cloth_type':cloth_type, 'codi_link':codi_link})
                                    with open('top_cloth_data.csv','a', encoding='utf-8', newline='') as top_cloth_csvfile:
                                        fieldnames = ['cloth_name', 'cloth_link', 'cloth_image', 'cloth_pattern', 'cloth_type', 'codi_link']
                                        wr = csv.DictWriter(top_cloth_csvfile, fieldnames=fieldnames)
                                        wr.writerow(top_cloth_data_list[len(top_cloth_data_list)-1])
                                    print(top_cloth_data_list[len(top_cloth_data_list)-1])
                                elif cloth_class.strip()=='바지':
                                    bottom_cloth_data_list.append({'cloth_name':cloth_name, 'cloth_link':cloth_link, 'cloth_image':cloth_image, 'cloth_pattern':cloth_pattern, 'cloth_type':cloth_type, 'codi_link':codi_link})
                                    with open('bottom_cloth_data.csv','a', encoding='utf-8', newline='') as bottom_cloth_csvfile:
                                        fieldnames = ['cloth_name', 'cloth_link', 'cloth_image', 'cloth_pattern', 'cloth_type', 'codi_link']
                                        wr = csv.DictWriter(bottom_cloth_csvfile, fieldnames=fieldnames)
                                        wr.writerow(bottom_cloth_data_list[len(bottom_cloth_data_list)-1])
                                    print(bottom_cloth_data_list[len(bottom_cloth_data_list)-1])
                                elif cloth_class.strip() == '아우터':
                                    outer_cloth_data_list.append({'cloth_name':cloth_name, 'cloth_link':cloth_link, 'cloth_image':cloth_image, 'cloth_pattern':cloth_pattern, 'cloth_type':cloth_type, 'codi_link':codi_link})
                                    with open('outer_cloth_data.csv','a', encoding='utf-8', newline='') as outer_cloth_csvfile:
                                        fieldnames = ['cloth_name', 'cloth_link', 'cloth_image', 'cloth_pattern', 'cloth_type', 'codi_link']
                                        wr = csv.DictWriter(outer_cloth_csvfile, fieldnames=fieldnames)
                                        wr.writerow(outer_cloth_data_list[len(outer_cloth_data_list)-1])
                                    print(outer_cloth_data_list[len(outer_cloth_data_list)-1])
                            driver.back()
                            time.sleep(3)
                            driver.implicitly_wait(LOADING_TIME)
                            cloth_list_num = driver.find_elements('class name',"styling_img")
                        except Exception as e:
                            print(e)
                            pass 
                    driver.back()
                    time.sleep(3)
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
                driver.back()
                pass
    driver.quit()
            # 코디 데이터 저장 (아직 테스트 불가)
    Outfit.create(outfit_info = explain, popularity = rank, img = codi_image, purchase_link = codi_link, cloth_list = cloth_links)


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

def csv_to_db(file_name, start_index):
    colors_match = {
        '블랙' : ['검정','black', 'blk', 'bk'],
        '그레이':['회색','gray', 'grey', 'gry','실버','silver','챠콜', '차콜','charcoal'],
        '베이지':['beige'],
        '네이비':['navy'],
        '데님': ['denim'],
        '아이보리': ['ivory','샌드','sand','오트밀','크림','cream'],
        '카키': ['khaki',],
        '기타색상':['컬러','color',],
        '블루':['blue', 'bl','스카이', '인디고'],
        '브라운': ['코코아','brown','cocoa','카멜', 'camel'],
        '화이트': ['흰색','white', 'wht',],
        '그린':['green','올리브', 'olive', '카고'],
        '레드':['red','버건디','burgundy','딥레드',],
        '오렌지':['orange',],
        '연청':['light blue'],
        '진청':['dark blue'],
        '청':[],
        '옐로우': ['엘로우','yellow','머스타드','mustard','골드','gold','로즈골드',],
        '퍼플':['purple','라벤더','lavender', 'violet',],
        '핑크':['pink',],
        '민트':['mint',],
    }
    
    if file_name == 'codi_data.csv':
        df = pd.read_csv(file_name, header=0)
        # print(df.loc[start_index, 'codi_name'])
        cnt = 0
        for i in range(start_index, len(df.index)):
            if cnt == 2000:
                time.sleep(300)
                cnt = 0
            
            # check is in db
            try: 
                tmp_outfit = Outfit.objects.get(outfit_name=df.loc[i, 'codi_name'], outfit_info=df.loc[i, 'explain'], popularity=df.loc[i, 'rank'], image_link = df.loc[i, 'codi_image'], purchase_link = df.loc[i, 'codi_link'])
            except Outfit.DoesNotExist:
                outfit = Outfit(outfit_name=df.loc[i, 'codi_name'], outfit_info=df.loc[i, 'explain'], popularity=df.loc[i, 'rank'], image_link = df.loc[i, 'codi_image'], purchase_link = df.loc[i, 'codi_link'])
                outfit.save()
                cnt += 1
            except Outfit.MultipleObjectsReturned:
                pass
            
        # time.sleep(300)
        # df = open(file_name, 'r', encoding='utf-8-sig')
        # dic_list = csv.DictReader(df)
        # print('{} start'.format(file_name))
        # for dic in dic_list:
        #     outfit = Outfit(outfit_name=dic['codi_name'], outfit_info=dic['explain'], popularity=dic['rank'], image_link = dic['codi_image'], purchase_link = dic['codi_link'])
        #     outfit.save()
        # print('{} end'.format(file_name))
        # if min(start_index+2000, len(df.index)) == len(df.index):
        #     print("End")
        # else:
        #     print('Next index is {}'.format(start_index+2000))
    else:
        df = pd.read_csv(file_name, header=0)
        cnt = 0
        # for i in range(start_index, start_index+10):
        for i in range(start_index, len(df.index)):
            if cnt == 3000:
                time.sleep(300)
                cnt = 0
            
            color = df.loc[i, 'cloth_color']
            
            for key in colors_match:
                if color == key:
                    break;
                else:
                    if color in colors_match[key]:
                        color = key
                    else:
                        pass
            
            label, created = LabelSet.objects.get_or_create(type = df.loc[i, 'cloth_type'], color = color, pattern = df.loc[i, 'cloth_pattern'])
            if created:
                label.save()
            outfit_list = []
            # print('y')
            for l in Outfit.objects.filter(purchase_link = df.loc[i, 'codi_link']):
                outfit_list.append(l)
            # print(outfit_list)
            
            #############################################3
            # check it is in db
            sample_cloth = SampleCloth(name = df.loc[i, 'cloth_name'], image_link = df.loc[i, 'cloth_image'], purchase_link = df.loc[i, 'cloth_link'], type = df.loc[i, 'cloth_type'], color = color, pattern = df.loc[i, 'cloth_pattern'], label_set = label)
            sample_cloth.save()
            time.sleep(0.1)
            sample_cloth.outfit.set(outfit_list)
            sample_cloth.save()
            cnt += 1
            # try:
            #     s = SampleCloth.objects.get(name = df.loc[i, 'cloth_name'], image_link = df.loc[i, 'cloth_image'], purchase_link = df.loc[i, 'cloth_link'], type = df.loc[i, 'cloth_type'], color = color, pattern = df.loc[i, 'cloth_pattern'], label_set = label)
            # except SampleCloth.DoesNotExist:
            #     sample_cloth = SampleCloth(name = df.loc[i, 'cloth_name'], image_link = df.loc[i, 'cloth_image'], purchase_link = df.loc[i, 'cloth_link'], type = df.loc[i, 'cloth_type'], color = color, pattern = df.loc[i, 'cloth_pattern'], label_set = label)
            #     sample_cloth.save()
            #     time.sleep(0.1)
            #     sample_cloth.outfit.set(outfit_list)
            #     sample_cloth.save()
            #     cnt += 1
            # except SampleCloth.MultipleObjectsReturned:
            #     pass
            
        # time.sleep(300)
        
        
        
        # if min(start_index+2000, len(df.index)) == len(df.index):
        #     print("End")
        # else:
        #     print('Next index is {}'.format(start_index+2000))
        # df = open(file_name, 'r', encoding='utf-8-sig')
        # dic_list = csv.DictReader(df)
        # print('{} start'.format(file_name))
        # for dic in dic_list:
        #     label, created = LabelSet.objects.get_or_create(type = dic['cloth_type'], color = dic['cloth_color'], pattern = dic['cloth_pattern'])
        #     label.save()
        #     outfit_list = []
        #     # print('y')
        #     for l in Outfit.objects.filter(purchase_link = dic['codi_link']):
        #         outfit_list.append(l)
        #     # print(outfit_list)
        #     sample_cloth = SampleCloth(name = dic['cloth_name'], image_link = dic['cloth_image'], purchase_link = dic['cloth_link'], type = dic['cloth_type'], color = dic['cloth_color'], pattern = dic['cloth_pattern'], label_set = label)
        #     sample_cloth.save()
        #     sample_cloth.outfit.set(outfit_list)
        #     sample_cloth.save()
        # print('{} end'.format(file_name))
            
            # print("save")
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


def add_color(filename, outfilename):
    #중청 == 청
    #
    colors = ['블랙','검정', '그레이','회색', '베이지', '네이비', '데님',
            '아이보리', '카키', '기타색상',
            '블루', '스카이', '브라운', '코코아', '화이트', '흰색',
            '그린', '샌드', '레드', '오렌지', 
            '연청','진청','light blue','dark blue',
            '청', '올리브', '카고', '인디고', '오트밀',
            '옐로우', '엘로우', '퍼플', '핑크', '민트', '카멜',
            '머스타드', '버건디', '라벤더', '딥레드',
            '실버', '골드', '로즈골드', '챠콜', '차콜', '크림', '컬러',
            'black', 'blk', 'bk', 'gray', 'grey', 'gry', 'beige', 'navy', 'denim',
            'ivory', 'khaki', 'blue', 'bl', 'brown','white', 'wht', 'green', 
            'sand', 'red', 'orange', 'yellow', 'purple', 'pink', 'mint', 'cocoa',
            'camel', 'mustard', 'burgundy', 'lavender', 'violet', 'silver', 'gold', 'charcoal', 'cream', 'olive', 'color']
    df = pd.read_csv(filename, header=0)
    df['cloth_color'] = 'None'
    for i in df.index:
        for c in colors:
            if c in df.loc[i, 'cloth_name'].lower():
                df.loc[i, 'cloth_color'] = c
                break;
        
    df.to_csv(outfilename, sep=',', header=True, index=False)
    # records = SampleCloth.objects.all()
    # for r in records:
    #     for c in colors:
    #         if c in r.name.lower():
    #             if r.color == c:
    #                 break
    #             else:
    #                 r.color = c
    #                 r.save()
    #                 break


def lable_db():
    #lable set, user cloth, sample cloth 에 대해서 적용

    colors_match = {
        '블랙' : ['검정','black', 'blk', 'bk'],
        '그레이':['회색','gray', 'grey', 'gry','실버','silver','챠콜', '차콜','charcoal'],
        '베이지':['beige'],
        '네이비':['navy'],
        '데님': ['denim'],
        '아이보리': ['ivory','샌드','sand','오트밀','크림','cream'],
        '카키': ['khaki',],
        '기타색상':['컬러','color',],
        '블루':['blue', 'bl','스카이', '인디고'],
        '브라운': ['코코아','brown','cocoa','카멜', 'camel'],
        '화이트': ['흰색','white', 'wht',],
        '그린':['green','올리브', 'olive', '카고'],
        '레드':['red','버건디','burgundy','딥레드',],
        '오렌지':['orange',],
        '연청':['light blue'],
        '진청':['dark blue'],
        '청':[],
        '옐로우': ['엘로우','yellow','머스타드','mustard','골드','gold','로즈골드',],
        '퍼플':['purple','라벤더','lavender', 'violet',],
        '핑크':['pink',],
        '민트':['mint',],
    }
    
    records_lableset = LabelSet.objects.all()
    records_samplecloth = SampleCloth.objects.all()
    
    for r in records_lableset:
        for key in colors_match:
            if r.color == key:
                break;
            else:
                if r.color in colors_match[key]:
                    r.color = key
                    r.save()
                else:
                    continue
    
    for r in records_samplecloth:
        for key in colors_match:
            if r.color == key:
                break;
            else:
                if r.color in colors_match[key]:
                    r.color = key
                    r.save()
                else:
                    continue

    
    ###################################################################################################33
    # 없는 거 지우는 거
    
    ################################################################################################3
    # del_outfit.delete()
    
    # outfits = Outfit.objects.all()
    # for outfit in outfits:
    #     sample_cloth_list = SampleCloth.objects.filter(outfit=outfit)
    #     if len(sample_cloth_list) == 1:
    #         print(outfit.id)
            # sample =  sample_cloth_list[0]
            # sample_file_name = '{name}.jpg'.format(name = re.sub(r'[^0-9]', '', sample.image_link)[0:-1])
            # sample_file_name = './media/images/' + sample_file_name
            # if os.path.isfile(sample_file_name):
            #     os.remove(sample_file_name)
            # else:
            #     pass
            # sample.delete()
            
            
            # file_name = '{name}.jpg'.format(name = re.sub(r'[^0-9]', '', outfit.image_link)[0:-1])
            # file_name = './media/images/' + file_name
            
            # if os.path.isfile(file_name):
            #     os.remove(file_name)
            # else:
            #     pass
            # outfit.delete()

def label_set_merge():
    labels = LabelSet.objects.all()
    dup_lists = []
    for l in labels:
        dup_lables = LabelSet.objects.filter(type=l.type, color=l.color, pattern=l.pattern)
        if len(list(dup_lables)) == 0:
            continue
        elif len(list(dup_lables)) > 1:
            print('-'*30)
            for dl in dup_lables:
                samples = SampleCloth.objects.filter(label_set = dl)
                print(len(samples))
    



def connect_cloth_outfit(file_name):
    df = pd.read_csv(file_name, header=0)
    ids = []
    for i in range(0, len(df.index)):
        try:
            lable =  LabelSet.objects.get(type = df.loc[i, 'cloth_type'], color = df.loc[i, 'cloth_color'], pattern = df.loc[i, 'cloth_pattern'])
        except LabelSet.DoesNotExist:
            continue
        except LabelSet.MultipleObjectsReturned:
            lable =  LabelSet.objects.filter(type = df.loc[i, 'cloth_type'], color = df.loc[i, 'cloth_color'], pattern = df.loc[i, 'cloth_pattern'])
            print('duplicated label')
            for l in lable:
                print(l.id)
            break

        outfit_list = []
        for l in Outfit.objects.filter(purchase_link = df.loc[i, 'codi_link']):
            outfit_list.append(l)
        
        try:
            s = SampleCloth.objects.get(name = df.loc[i, 'cloth_name'], image_link = df.loc[i, 'cloth_image'], purchase_link = df.loc[i, 'cloth_link'], type = df.loc[i, 'cloth_type'], color = df.loc[i, 'cloth_color'], pattern = df.loc[i, 'cloth_pattern'], label_set = lable)
            s.outfit.set(outfit_list)
            s.save()
            ids.append(s.id)
        except SampleCloth.DoesNotExist:
            continue
        except SampleCloth.MultipleObjectsReturned:
            ss = SampleCloth.objects.filter(name = df.loc[i, 'cloth_name'], image_link = df.loc[i, 'cloth_image'], purchase_link = df.loc[i, 'cloth_link'], type = df.loc[i, 'cloth_type'], color = df.loc[i, 'cloth_color'], pattern = df.loc[i, 'cloth_pattern'], label_set = lable)
            for s in ss:
                if s.id in ids:
                    continue
                else:
                    s.outfit.set(outfit_list)
                    s.save()
                    ids.append(s.id)
                    break



def check_file():
    pass
    # dir_path = './media/images/'
    # outfits = Outfit.objects.all()
    # sample = SampleCloth.objects.all()
    
    # outfit_image_link = [str(o.image).split('/')[1] for o in outfits]
    # sample_image_link = [str(s.image).split('/')[1] for s in sample]
    # used_file = []
    # not_used_file = []
    # for path in os.listdir(dir_path):
    #     if path in outfit_image_link or path in sample_image_link:
    #         used_file.append(path)
    #     else:
    #         not_used_file.append(path)
    #         # os.remove('./media/images/' + path)
    # print(len(used_file))
    # print(len(not_used_file))

    # samples = SampleCloth.objects.all()
    # for s in samples:
    #     s.save()

#parse_outfit_data() #코디 데이터 크롤링하는 함수
#parse_top_cloth_data() #상의 데이터 크롤링하는 함수
#parse_outer_cloth_data() #아우터 데이터 크롤링하는 함수
#parse_bottom_cloth_data() #하의 데이터 크롤링하는 함수
#list_to_csv() # list를 csv 파일로 변환하는 함수인데 지금 쓸 필요 없음
#csv_to_list('cloth_list.csv') #csv 파일 list로 변환 변환하고자하는 파일 명 파라미터로 주기.

check_file()

# csv_to_db('codi_data.csv', 0) #csv 파일에 적힌 데이터 db로 옮기기 원하는 csv파일 파라미터로 주기(2000개씩)
# time.sleep(300)
# csv_to_db('top.csv', 0)
# time.sleep(300)
# csv_to_db('bottom.csv', 0)
# time.sleep(300)
# csv_to_db('outer.csv', 0)
# LabelSet.objects.all().delete()
# add_color('bottom_cloth_data.csv', 'bottom.csv')
# lable_db()
# LabelSet.objects.all().delete()
# label_set_merge()
# connect_cloth_outfit('top.csv')
# connect_cloth_outfit('bottom.csv')
# connect_cloth_outfit('outer.csv')
