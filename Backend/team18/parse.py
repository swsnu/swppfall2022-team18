import requests
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import urllib.request
import os, zipfile
from selenium.webdriver.chrome.options import Options
import re 
import pandas as pd
import csv

os.environ.setdefault("DJANGO_SETTINGS_MODULE","team18.settings")

import django
django.setup()

#코디에 속해있는 옷 링크(테스트 용)
cloth_list = ['https://www.musinsa.com/app/goods/2086653','https://www.musinsa.com/app/goods/836495']
top_cloth_data_list =[
    {'cloth_color':'베이지', 'cloth_name':'릴랙스 오버사이즈 크루넥 - 베이지 / CM1408', 'cloth_link':'https://www.musinsa.com/app/goods/957879/0', 'cloth_num':957879, 'cloth_image':'https://image.msscdn.net/images/goods_img/20190219/957879/957879_6_500.jpg?t=20210727092552', 'cloth_pattern':'로고', 'cloth_type':'맨투맨/스웨트셔츠'},
    
]
bottom_cloth_data_list =[
    {'cloth_color':'연청', 'cloth_name':'와이드 데님 팬츠 (BLEACH)', 'cloth_link':'https://www.musinsa.com/app/goods/986708/0', 'cloth_num':986708, 'cloth_image':'https://image.msscdn.net/images/goods_img/20190319/986708/986708_1_500.jpg?t=20220628154233', 'cloth_pattern':'None', 'cloth_type':'데님 팬츠'},
    {'cloth_color':'중청', 'cloth_name':'와이드 데님 팬츠 (LIGHT BLUE)', 'cloth_link':'https://www.musinsa.com/app/goods/858911/0', 'cloth_num':858911, 'cloth_image':'https://image.msscdn.net/images/goods_img/20180914/858911/858911_6_500.jpg?t=20220628150414', 'cloth_pattern':'None', 'cloth_type':'데님 팬츠'},
    {'cloth_color':'검정', 'cloth_name':'3-스트라이프 트레이닝 팬츠 - 블랙 / CM1409', 'cloth_link':'https://www.musinsa.com/app/goods/957880/0', 'cloth_num':957880, 'cloth_image':'https://image.msscdn.net/images/goods_img/20190219/957880/957880_8_500.jpg?t=20210727113258', 'cloth_pattern':'스트라이프', 'cloth_type':'트레이닝/조거 팬츠'},
]
outer_cloth_data_list =[
    {'cloth_color':'그레이', 'cloth_name':'(SS19) Denim Trucker Jacket Grey', 'cloth_link':'https://www.musinsa.com/app/goods/969580/0', 'cloth_num':969580, 'cloth_image':'https://image.msscdn.net/images/goods_img/20190228/969580/969580_1_500.jpg?t=20190228191158', 'cloth_pattern':'None', 'cloth_type':'트러커 재킷'},
    {'cloth_color':'갈색', 'cloth_name':'TRUCKER JACKET(2COLOR)', 'cloth_link':'https://www.musinsa.com/app/goods/952064/0', 'cloth_num':952064, 'cloth_image':'https://image.msscdn.net/images/goods_img/20190213/952064/952064_3_500.jpg?t=20220628164752', 'cloth_pattern':'None', 'cloth_type':'트러커 재킷'},
]
codi_data_list = [
    {'codi_name':'그레이의 향연','rank':70650, 'explain':'라이트 그레이 컬러의 재킷과 스웨트셔츠를 루즈 핏 데님 팬츠로 마무리한 캐주얼 룩', 'codi_link':'https://www.musinsa.com/app/styles/views/11748?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1', 'cloth_links':['https://www.musinsa.com/app/goods/969580/0','https://www.musinsa.com/app/goods/986708/0'], 'codi_image':'http://image.msscdn.net/images/style/list/l_3_2019083016104600000076635.jpg'},
    {'codi_name':'나쁠게 없어!','rank':58575, 'explain':'트러커 재킷과 스트라이프 패턴 티셔츠를 코디하고 데님 팬츠로 심플하게 연출한 캠퍼스 룩', 'codi_link':'https://www.musinsa.com/app/styles/views/8679?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1', 'cloth_links':['https://www.musinsa.com/app/goods/952064/0','https://www.musinsa.com/app/goods/858911/0'], 'codi_image':'https://image.msscdn.net/images/style/detail/8679/detail_8679_1_500.jpg'},
    {'codi_name':'스포티룩','rank':58365, 'explain':'화사한 아이보리 컬러의 스웨트셔츠와 트랙 팬츠를 매치하고 독특한 디자인의 캡으로 마무리한 이지 캐주얼 룩', 'codi_link':'https://www.musinsa.com/app/styles/views/8412?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page=1', 'cloth_links':['https://www.musinsa.com/app/goods/957879/0','https://www.musinsa.com/app/goods/957880/0'], 'codi_image':'https://image.msscdn.net/images/style/detail/8412/detail_8412_1_500.jpg'},
]

# 코디 데이터 파싱
def parse_outfit_data():
    
    driver = webdriver.Chrome()
    time.sleep(2)
    driver.implicitly_wait(2)
    LOADING_TIME = 5
    for i in range(1,215): # 뒷 페이지 가는 버튼 있을 때까지.
        driver.get("https://www.musinsa.com/app/styles/lists?use_yn_360=&style_type=&brand=&model=&tag_no=&max_rt=&min_rt=&display_cnt=60&list_kind=big&sort=view_cnt&page={}".format(i))
        time.sleep(2)
        driver.implicitly_wait(LOADING_TIME)
        driver.find_element('xpath','/html/body/div[3]/div[3]/div[1]/button[2]').click()
        time.sleep(2)
        driver.implicitly_wait(LOADING_TIME)
        codi_li = driver.find_elements("class name","style-list-item__thumbnail")
        list_num = 1
        codi_name_list = driver.find_elements("class name","style-list-information__title")
        for li in codi_li: # 한 페이지에 있는 코디 사진 모두 접근
            # 조회 수
            try:
                rank = driver.find_element("xpath","/html/body/div[3]/div[3]/form/div[4]/div/ul/li[{}]/div[3]/span[2]".format(list_num)).text
                rank = re.sub(r'[^0-9]','',rank)
                print(rank)
                codi_name = codi_name_list[list_num-1].text
                print(codi_name)
                # 코디 이미지
                codi_image = driver.find_element('xpath',"/html/body/div[3]/div[3]/form/div[4]/div/ul/li[{}]/div[1]/a/div/img".format(list_num)).get_attribute("src")
                driver.find_element('xpath',"/html/body/div[3]/div[3]/form/div[4]/div/ul/li[{}]/div[1]/a".format(list_num)).click()
                driver.implicitly_wait(LOADING_TIME)
                # 코디 설명
                explain = driver.find_element('xpath',"//*[@id=\"style_info\"]/div[1]/p").text
                # 코디 링크
                codi_link = driver.current_url
                
                # 코디 구성 옷 리스트
                try:
                    cloth_list_num = driver.find_elements('class name',"styling_img")
                    
                    for c in cloth_list_num: # 하나의 코디를 이루는 옷 링크 모으기.
                        try:
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
                            time.sleep(2)
                            driver.implicitly_wait(LOADING_TIME)
                        except Exception as e:
                            print(e)
                            pass 
                    driver.back()
                    time.sleep(2)
                    driver.implicitly_wait(LOADING_TIME)
                    list_num += 1
                    print(codi_data_list[codi_data_list.__len__-1])
                    codi_data_list.append({'codi_name':codi_name,'rank':rank, 'explain':explain, 'codi_link':codi_link, 'cloth_links':cloth_links, 'codi_image':codi_image})
                except Exception as e:
                    print(e)
                    pass
            except Exception as e:
                print(e)
                pass
    driver.quit()
    driver.close()
            # 코디 데이터 저장 (아직 테스트 불가)
            # Outfit.create(outfit_info = explain, popularity = rank, img = codi_image, purchase_link = codi_link, cloth_list = cloth_links)

# 옷 데이터 파싱 저장할 때 코디 데이터랑 연결, label set 만들어줘야함.
def parse_top_cloth_data():
    
    driver = webdriver.Chrome()
    driver.implicitly_wait(2)
    
    LOADING_TIME = 15
    # 상의 페이지로 들어감.
    driver.get("https://www.musinsa.com/categories/item/001")
    time.sleep(2)
    driver.implicitly_wait(LOADING_TIME)
    driver.find_element('xpath','/html/body/div[2]/div[3]/div[12]/button[2]').click()
    time.sleep(2)
    driver.implicitly_wait(LOADING_TIME)
    # 상의 색깔별로 들어감. 
    color_num = 1
    for li in driver.find_elements('xpath','//*[@id="toolTip"]/li'):
        try:
            cloth_color = driver.find_element('xpath','//*[@id="toolTip"]/li[{}]/div/div'.format(color_num)).text
            li.click()
            time.sleep(2)
            driver.implicitly_wait(LOADING_TIME)
            #색상 별 총 페이지 수
            page_cnt = int(driver.find_element('class name',"totalPagingNum").text)
            #이제부터 상의-색상별 의상 페이지 이동
            for c in range(1,page_cnt+1):
                #해당 페이지의 옷들 접근
                try:
                    driver.get('https://www.musinsa.com/categories/item/001?d_cat_cd=001&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                    time.sleep(2)
                    driver.implicitly_wait(LOADING_TIME)
                    driver.find_element('xpath','/html/body/div[2]/div[3]/div[12]/button[2]').click()
                    time.sleep(2)
                    driver.implicitly_wait(LOADING_TIME)
                    cloth_cnt = len(driver.find_elements('xpath','//*[@id="searchList"]/li'))
                    print(cloth_cnt, flush=True)
                    
                    for l in range(1,cloth_cnt+1):
                        try:
                            print(l,flush=True)
                        
                            driver.get('https://www.musinsa.com/categories/item/001?d_cat_cd=001&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                            time.sleep(2)
                            driver.implicitly_wait(LOADING_TIME)
                            try:
                                cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[3]/div[1]/a/img'.format(l)).get_attribute("src")
                            except:
                                try:
                                    cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[4]/div[1]/a/img'.format(l)).get_attribute("src")
                                except:
                                    cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[2]/div[1]/a/img'.format(l)).get_attribute("src")
                            cloth_num = int(driver.find_element('xpath','//*[@id="searchList"]/li[{}]'.format(l)).get_attribute('data-no'))
                            driver.find_element('xpath','//*[@id="searchList"]/li[{}]'.format(l)).click()
                            time.sleep(2)
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
                                top_cloth_data_list.append({'cloth_color':cloth_color, 'cloth_name':cloth_name, 'cloth_link':cloth_link, 'cloth_num':cloth_num, 'cloth_image':cloth_image, 'cloth_pattern':cloth_pattern, 'cloth_type':cloth_type})
                                print(top_cloth_data_list[top_cloth_data_list.__len__-1])
                                #outfit이랑 label set 찾고 저장
                                # outfits = Outfit.filter(cloth_list.__contains__(cloth_link))
                                # label = LabelSet.get_or_create(type = cloth_type, color = cloth_color, pattern = cloth_pattern)
                                # SampleCloth(name = cloth_name, img = cloth_image, purchase_link = cloth_link, outfit = outfits, type = cloth_type, color = cloth_color, pattern = cloth_pattern, label_set = label)
                            else:
                                print("No")
                        except Exception as e:
                            print(e)
                            pass
                except Exception as e:
                    print(e)
                    pass
        except Exception as e:
            print(e)
            pass
        color_num+=1
    driver.quit()
    driver.close()
        
def parse_bottom_cloth_data():
    
    driver = webdriver.Chrome()
    time.sleep(2)
    driver.implicitly_wait(2)
    
    LOADING_TIME = 15
    # 상의 페이지로 들어감.
    driver.get("https://www.musinsa.com/categories/item/003")
    time.sleep(2)
    driver.implicitly_wait(LOADING_TIME)
    driver.find_element('xpath','/html/body/div[2]/div[3]/div[12]/button[2]').click()
    time.sleep(2)
    driver.implicitly_wait(LOADING_TIME)
    # 상의 색깔별로 들어감. 
    color_num = 1
    for li in driver.find_elements('xpath','//*[@id="toolTip"]/li'):
        try:
            cloth_color = driver.find_element('xpath','//*[@id="toolTip"]/li[{}]/div/div'.format(color_num)).text
            li.click()
            time.sleep(2)
            driver.implicitly_wait(LOADING_TIME)
            #색상 별 총 페이지 수
            page_cnt = int(driver.find_element('class name',"totalPagingNum").text)
            #이제부터 상의-색상별 의상 페이지 이동
            for c in range(1,page_cnt+1):
                #해당 페이지의 옷들 접근
                try:
                    driver.get('https://www.musinsa.com/categories/item/003?d_cat_cd=003&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                    time.sleep(2)
                    driver.implicitly_wait(LOADING_TIME)
                    driver.find_element('xpath','/html/body/div[2]/div[3]/div[12]/button[2]').click()
                    time.sleep(2)
                    driver.implicitly_wait(LOADING_TIME)
                    cloth_cnt = len(driver.find_elements('xpath','//*[@id="searchList"]/li'))
                    print(cloth_cnt, flush=True)
                    
                    for l in range(1,cloth_cnt+1):
                        try:
                            print(l,flush=True)
                        
                            driver.get('https://www.musinsa.com/categories/item/003?d_cat_cd=003&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                            time.sleep(2)
                            driver.implicitly_wait(LOADING_TIME)
                            try:
                                cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[3]/div[1]/a/img'.format(l)).get_attribute("src")
                            except:
                                try:
                                    cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[4]/div[1]/a/img'.format(l)).get_attribute("src")
                                except:
                                    cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[2]/div[1]/a/img'.format(l)).get_attribute("src")
                            cloth_num = int(driver.find_element('xpath','//*[@id="searchList"]/li[{}]'.format(l)).get_attribute('data-no'))
                            driver.find_element('xpath','//*[@id="searchList"]/li[{}]'.format(l)).click()
                            time.sleep(2)
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
                                bottom_cloth_data_list.append({'cloth_color':cloth_color, 'cloth_name':cloth_name, 'cloth_link':cloth_link, 'cloth_num':cloth_num, 'cloth_image':cloth_image, 'cloth_pattern':cloth_pattern, 'cloth_type':cloth_type})
                                print(bottom_cloth_data_list[bottom_cloth_data_list.__len__-1])
                                #outfit이랑 label set 찾고 저장
                                # outfits = Outfit.filter(cloth_list.__contains__(cloth_link))
                                # label = LabelSet.get_or_create(type = cloth_type, color = cloth_color, pattern = cloth_pattern)
                                # SampleCloth(name = cloth_name, img = cloth_image, purchase_link = cloth_link, outfit = outfits, type = cloth_type, color = cloth_color, pattern = cloth_pattern, label_set = label)
                            else:
                                print("No")
                        except Exception as e:
                            print(e)
                            pass
                except Exception as e:
                    print(e)
                    pass
        except Exception as e:
            print(e)
            pass
        color_num+=1
    driver.quit()
    driver.close()
                    
def parse_outer_cloth_data():
    
    driver = webdriver.Chrome()
    time.sleep(2)
    driver.implicitly_wait(2)
    
    LOADING_TIME = 15
    # 상의 페이지로 들어감.
    driver.get("https://www.musinsa.com/categories/item/002")
    time.sleep(2)
    driver.implicitly_wait(LOADING_TIME)
    driver.find_element('xpath','/html/body/div[2]/div[3]/div[12]/button[2]').click()
    time.sleep(2)
    driver.implicitly_wait(LOADING_TIME)
    # 상의 색깔별로 들어감. 
    color_num = 1
    for li in driver.find_elements('xpath','//*[@id="toolTip"]/li'):
        try:
            cloth_color = driver.find_element('xpath','//*[@id="toolTip"]/li[{}]/div/div'.format(color_num)).text
            li.click()
            time.sleep(2)
            driver.implicitly_wait(LOADING_TIME)
            #색상 별 총 페이지 수
            page_cnt = int(driver.find_element('class name',"totalPagingNum").text)
            #이제부터 상의-색상별 의상 페이지 이동
            for c in range(1,page_cnt+1):
                #해당 페이지의 옷들 접근
                try:
                    driver.get('https://www.musinsa.com/categories/item/002?d_cat_cd=002&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                    time.sleep(2)
                    driver.implicitly_wait(LOADING_TIME)
                    driver.find_element('xpath','/html/body/div[2]/div[3]/div[12]/button[2]').click()
                    time.sleep(2)
                    driver.implicitly_wait(LOADING_TIME)
                    cloth_cnt = len(driver.find_elements('xpath','//*[@id="searchList"]/li'))
                    print(cloth_cnt, flush=True)
                    
                    for l in range(1,cloth_cnt+1):
                        try:
                            print(l,flush=True)
                        
                            driver.get('https://www.musinsa.com/categories/item/002?d_cat_cd=002&brand=&list_kind=small&sort=pop_category&sub_sort=&page={}&display_cnt=90&group_sale=&exclusive_yn=&sale_goods=&timesale_yn=&ex_soldout=&kids=&color={}&price1=&price2=&shoeSizeOption=&tags=&campaign_id=&includeKeywords=&measure='.format(c,color_num))
                            time.sleep(2)
                            driver.implicitly_wait(LOADING_TIME)
                            try:
                                cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[3]/div[1]/a/img'.format(l)).get_attribute("src")
                            except:
                                try:
                                    cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[4]/div[1]/a/img'.format(l)).get_attribute("src")
                                except:
                                    cloth_image = driver.find_element('xpath','//*[@id="searchList"]/li[{}]/div[2]/div[1]/a/img'.format(l)).get_attribute("src")
                            cloth_num = int(driver.find_element('xpath','//*[@id="searchList"]/li[{}]'.format(l)).get_attribute('data-no'))
                            driver.find_element('xpath','//*[@id="searchList"]/li[{}]'.format(l)).click()
                            time.sleep(2)
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
                                outer_cloth_data_list.append({'cloth_color':cloth_color, 'cloth_name':cloth_name, 'cloth_link':cloth_link, 'cloth_num':cloth_num, 'cloth_image':cloth_image, 'cloth_pattern':cloth_pattern, 'cloth_type':cloth_type})
                                print(outer_cloth_data_list[outer_cloth_data_list.__len__-1])
                                #outfit이랑 label set 찾고 저장
                                # outfits = Outfit.filter(cloth_list.__contains__(cloth_link))
                                # label = LabelSet.get_or_create(type = cloth_type, color = cloth_color, pattern = cloth_pattern)
                                # SampleCloth(name = cloth_name, img = cloth_image, purchase_link = cloth_link, outfit = outfits, type = cloth_type, color = cloth_color, pattern = cloth_pattern, label_set = label)
                            else:
                                print("No")
                        except Exception as e:
                            print(e)
                            pass
                except Exception as e:
                    print(e)
                    pass
        except Exception as e:
            print(e)
            pass
        color_num+=1
    driver.quit()
    driver.close()
    
def list_to_csv():
    df_outfit = pd.DataFrame(codi_data_list)
    df_top = pd.DataFrame(top_cloth_data_list)
    df_bottom = pd.DataFrame(bottom_cloth_data_list)
    df_outer = pd.DataFrame(outer_cloth_data_list)
    print(df_outfit.head(5))
    df_outfit.to_csv("codi_data.csv",encoding='utf-8-sig')
    df_top.to_csv("top_cloth_data.csv",encoding='utf-8-sig')
    df_bottom.to_csv("bottom_cloth_data.csv",encoding='utf-8-sig')
    df_outer.to_csv("outer_cloth_data.csv",encoding='utf-8-sig')
    
#parse_outfit_data()
#parse_top_cloth_data()
#parse_outer_cloth_data()
#parse_bottom_cloth_data()
list_to_csv()

    
    ##이슈
    # sample cloth에 outfit 리스트로 들어가야함.
    # outfit에 구성 옷의 링크 리스트 추가 -> 옷 저장할 때 코디 찾으려면 해야함.
    
