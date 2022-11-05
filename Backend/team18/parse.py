import requests
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import urllib.request
import os, zipfile
from selenium.webdriver.chrome.options import Options
import re 

os.environ.setdefault("DJANGO_SETTINGS_MODULE","team18.settings")

import django
django.setup()

#코디에 속해있는 옷 링크
cloth_list = ['https://www.musinsa.com/app/goods/2086653','https://www.musinsa.com/app/goods/836495']

# 코디 데이터 파싱
def parse_outfit_data():
    driver = webdriver.Chrome()
    driver.implicitly_wait(2)
    
    LOADING_TIME = 5
    for i in range(1,215): # 뒷 페이지 가는 버튼 있을 때까지.
        driver.get("https://www.musinsa.com/app/styles/lists?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page={}".format(i))
        driver.implicitly_wait(LOADING_TIME)
        codi_li = driver.find_elements("class name","style-list-item__thumbnail")
        list_num = 1
        for li in codi_li: # 한 페이지에 있는 코디 사진 모두 접근
            # 조회 수
            rank = driver.find_element("xpath","/html/body/div[3]/div[3]/form/div[4]/div/ul/li[{}]/div[3]/span[2]".format(list_num)).text
            print(rank)
            rank = re.sub(r'[^0-9]','',rank)
            print(rank)
            # 코디 이미지
            codi_image = driver.find_element('xpath',"/html/body/div[3]/div[3]/form/div[4]/div/ul/li[{}]/div[1]/a/div/img".format(list_num)).get_attribute("src")
            driver.find_element('xpath',"/html/body/div[3]/div[3]/form/div[4]/div/ul/li[{}]/div[1]/a".format(list_num)).click()
            driver.implicitly_wait(LOADING_TIME)
            # 코디 설명
            explain = driver.find_element('xpath',"//*[@id=\"style_info\"]/div[1]/p").text
            # 코디 링크
            codi_link = driver.current_url
            
            # 코디 구성 옷 리스트
            cloth_list_num = driver.find_elements('class name',"styling_img")
            
            for c in cloth_list_num: # 하나의 코디를 이루는 옷 링크 모으기.
                c.click()
                cloth_links = []
                driver.implicitly_wait(LOADING_TIME)
                store = False
                #상의, 바지, 아우터일 경우에만 옷 저장
                for cloth_type in driver.find_elements("xpath","//*[@id=\"page_product_detail\"]/div[3]/div[3]/div[1]/p/a"):
                    if (cloth_type.text == '상의' or cloth_type.text == '바지' or cloth_type.text == '아우터'):
                        store = True
                if store:
                    cloth_list.append(driver.current_url)
                    cloth_links.append(driver.current_url)
                driver.back()
            driver.back()
            list_num += 1
            print(rank, explain, codi_link, cloth_links)
            
            # 코디 데이터 저장 (아직 테스트 불가)
            # Outfit.create(outfit_info = explain, popularity = rank, img = codi_image, purchase_link = codi_link, cloth_list = cloth_links)

# 옷 데이터 파싱 저장할 때 코디 데이터랑 연결, label set 만들어줘야함.
def parse_top_cloth_data():
    
    driver = webdriver.Chrome()
    driver.implicitly_wait(2)
    
    LOADING_TIME = 15
    # 상의 페이지로 들어감.
    driver.get("https://www.musinsa.com/categories/item/001")
    driver.implicitly_wait(LOADING_TIME)
    # 상의 색깔별로 들어감. 
    color_num = 1
    for li in driver.find_elements('xpath','//*[@id="toolTip"]/li'):
        cloth_color = driver.find_element('xpath','//*[@id="toolTip"]/li[{}]/div/div'.format(color_num)).text
        li.click()
        driver.implicitly_wait(LOADING_TIME)
        #색상 별 총 페이지 수
        page_cnt = int(driver.find_element('class name',"totalPagingNum").text)
        #이제부터 상의-색상별 의상 페이지 이동
        for c in range(1,page_cnt+1):
            #해당 페이지의 옷들 접근
            driver.get('https://www.musinsa.com/categories/item/001?d_cat_cd=001&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
            driver.implicitly_wait(LOADING_TIME)
            cloth_cnt = len(driver.find_elements('xpath','//*[@id="searchList"]/li'))
            print(cloth_cnt, flush=True)
            
            for l in range(1,cloth_cnt+1):
                print(l,flush=True)
            
                driver.get('https://www.musinsa.com/categories/item/001?d_cat_cd=001&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                driver.implicitly_wait(LOADING_TIME)
                try:
                    cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[3]/div[1]/a/img'.format(l)).get_attribute("src")
                except:
                    try:
                        cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[4]/div[1]/a/img'.format(l)).get_attribute("src")
                    except:
                        cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[2]/div[1]/a/img'.format(l)).get_attribute("src")
                driver.find_element('xpath','//*[@id="searchList"]/li[{}]'.format(l)).click()
                driver.implicitly_wait(LOADING_TIME)
                cloth_link = driver.current_url
                if cloth_list.__contains__(cloth_link):
                    cloth_type = driver.find_element('xpath','//*[@id="page_product_detail"]/div[3]/div[3]/div[1]/p/a[2]').text
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
                    print(cloth_color, cloth_name, cloth_link)
                    #outfit이랑 label set 찾고 저장
                    # outfits = Outfit.filter(cloth_list.__contains__(cloth_link))
                    # label = LabelSet.get_or_create(type = cloth_type, color = cloth_color, pattern = cloth_pattern)
                    # SampleCloth(name = cloth_name, img = cloth_image, purchase_link = cloth_link, outfit = outfits, type = cloth_type, color = cloth_color, pattern = cloth_pattern, label_set = label)
                else:
                    print("No")
        color_num+=1
        
def parse_bottom_cloth_data():
    
    driver = webdriver.Chrome()
    driver.implicitly_wait(2)
    
    LOADING_TIME = 15
    # 상의 페이지로 들어감.
    driver.get("https://www.musinsa.com/categories/item/003")
    driver.implicitly_wait(LOADING_TIME)
    # 상의 색깔별로 들어감. 
    color_num = 1
    for li in driver.find_elements('xpath','//*[@id="toolTip"]/li'):
        cloth_color = driver.find_element('xpath','//*[@id="toolTip"]/li[{}]/div/div'.format(color_num)).text
        li.click()
        driver.implicitly_wait(LOADING_TIME)
        #색상 별 총 페이지 수
        page_cnt = int(driver.find_element('class name',"totalPagingNum").text)
        #이제부터 상의-색상별 의상 페이지 이동
        for c in range(1,page_cnt+1):
            #해당 페이지의 옷들 접근
            driver.get('https://www.musinsa.com/categories/item/003?d_cat_cd=003&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
            driver.implicitly_wait(LOADING_TIME)
            cloth_cnt = len(driver.find_elements('xpath','//*[@id="searchList"]/li'))
            print(cloth_cnt, flush=True)
            
            for l in range(1,cloth_cnt+1):
                print(l,flush=True)
            
                driver.get('https://www.musinsa.com/categories/item/003?d_cat_cd=003&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                driver.implicitly_wait(LOADING_TIME)
                try:
                    cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[3]/div[1]/a/img'.format(l)).get_attribute("src")
                except:
                    try:
                        cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[4]/div[1]/a/img'.format(l)).get_attribute("src")
                    except:
                        cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[2]/div[1]/a/img'.format(l)).get_attribute("src")
                driver.find_element('xpath','//*[@id="searchList"]/li[{}]'.format(l)).click()
                driver.implicitly_wait(LOADING_TIME)
                cloth_link = driver.current_url
                if cloth_list.__contains__(cloth_link):
                    cloth_type = driver.find_element('xpath','//*[@id="page_product_detail"]/div[3]/div[3]/div[1]/p/a[2]').text
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
                    print(cloth_color, cloth_name, cloth_link)
                    #outfit이랑 label set 찾고 저장
                    # outfits = Outfit.filter(cloth_list.__contains__(cloth_link))
                    # label = LabelSet.get_or_create(type = cloth_type, color = cloth_color, pattern = cloth_pattern)
                    # SampleCloth(name = cloth_name, img = cloth_image, purchase_link = cloth_link, outfit = outfits, type = cloth_type, color = cloth_color, pattern = cloth_pattern, label_set = label)
                else:
                    print("No")
        color_num+=1
                    
def parse_outer_cloth_data():
    
    driver = webdriver.Chrome()
    driver.implicitly_wait(2)
    
    LOADING_TIME = 15
    # 상의 페이지로 들어감.
    driver.get("https://www.musinsa.com/categories/item/002")
    driver.implicitly_wait(LOADING_TIME)
    # 상의 색깔별로 들어감. 
    color_num = 1
    for li in driver.find_elements('xpath','//*[@id="toolTip"]/li'):
        cloth_color = driver.find_element('xpath','//*[@id="toolTip"]/li[{}]/div/div'.format(color_num)).text
        li.click()
        driver.implicitly_wait(LOADING_TIME)
        #색상 별 총 페이지 수
        page_cnt = int(driver.find_element('class name',"totalPagingNum").text)
        #이제부터 상의-색상별 의상 페이지 이동
        for c in range(1,page_cnt+1):
            #해당 페이지의 옷들 접근
            driver.get('https://www.musinsa.com/categories/item/002?d_cat_cd=002&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
            driver.implicitly_wait(LOADING_TIME)
            cloth_cnt = len(driver.find_elements('xpath','//*[@id="searchList"]/li'))
            print(cloth_cnt, flush=True)
            
            for l in range(1,cloth_cnt+1):
                print(l,flush=True)
            
                driver.get('https://www.musinsa.com/categories/item/002?d_cat_cd=002&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                driver.implicitly_wait(LOADING_TIME)
                try:
                    cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[3]/div[1]/a/img'.format(l)).get_attribute("src")
                except:
                    try:
                        cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[4]/div[1]/a/img'.format(l)).get_attribute("src")
                    except:
                        cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[2]/div[1]/a/img'.format(l)).get_attribute("src")
                driver.find_element('xpath','//*[@id="searchList"]/li[{}]'.format(l)).click()
                driver.implicitly_wait(LOADING_TIME)
                cloth_link = driver.current_url
                if cloth_list.__contains__(cloth_link):
                    cloth_type = driver.find_element('xpath','//*[@id="page_product_detail"]/div[3]/div[3]/div[1]/p/a[2]').text
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
                    print(cloth_color, cloth_name, cloth_link)
                    #outfit이랑 label set 찾고 저장
                    # outfits = Outfit.filter(cloth_list.__contains__(cloth_link))
                    # label = LabelSet.get_or_create(type = cloth_type, color = cloth_color, pattern = cloth_pattern)
                    # SampleCloth(name = cloth_name, img = cloth_image, purchase_link = cloth_link, outfit = outfits, type = cloth_type, color = cloth_color, pattern = cloth_pattern, label_set = label)
                else:
                    print("No")
        color_num+=1

parse_outfit_data()
parse_top_cloth_data()
parse_outer_cloth_data()
parse_bottom_cloth_data()    
    
    ##이슈
    # sample cloth에 outfit 리스트로 들어가야함.
    # outfit에 구성 옷의 링크 리스트 추가 -> 옷 저장할 때 코디 찾으려면 해야함.
    
