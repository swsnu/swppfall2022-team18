'''
views of ooo
'''
import json
from json.decoder import JSONDecodeError
from datetime import date, timedelta
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.http.response import HttpResponseNotAllowed, HttpResponseNotFound
from django.http.response import HttpResponseBadRequest
from django.contrib.auth import authenticate, logout, login
from django.contrib.auth.models import User
from django.db.models import Q
from .models import Outfit, SampleCloth, UserCloth, Closet, LabelSet
from .serializers import SampleClothSerializer, OutfitSerializer, UserClothSerializer

type_tree =  [
    ['상의', ['반소매 티셔츠', '피케/카라 티셔츠', '긴소매 티셔츠',
      '맨투맨/스웨트셔츠', '민소매 티셔츠', '후드 티셔츠', '셔츠/블라우스', '니트/스웨터', '기타 상의']],
    ['바지', ['데님 팬츠', '숏 팬츠', '코튼 팬츠', '레깅스',
    '슈트 팬츠/슬랙스', '점프 슈트/오버올', '트레이닝/조거 팬츠', '기타 바지']],
    ['아우터', ['후드 집업', '환절기 코트', '블루종/MA-1', '겨울 싱글 코트',
    '레더/라이더스 재킷', '겨울 더블 코트', '무스탕/퍼', '겨울 기타 코트',
    '롱패딩/롱헤비 아우터', '트러커 재킷', '슈트/블레이저 재킷', '숏패딩/숏헤비 아우터',
    '카디건', '패딩 베스트', '아노락 재킷','베스트', '플리스/뽀글이', '사파리/헌팅 재킷',
    '트레이닝 재킷', '나일론/코치 재킷', '스타디움 재킷', '기타 아우터']]]

def index():
    '''
    test
    '''
    return HttpResponse("Hello, world")

@csrf_exempt
def signup(request):
    '''
    signup : django default user
    '''
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())["body"]
        # print(req_data)
        username = req_data['username']
        password = req_data['password']
        #check duplicate username
        try:
            # dup_user = User.objects.get(username=username)
            User.objects.get(username=username)
        except User.DoesNotExist:
            new_user = User.objects.create_user(username=username, password=password)
            Closet.objects.create(user=new_user)
            return HttpResponse(status=201)
        return HttpResponse(status=404)
    return HttpResponseNotAllowed(['POST'], status=405)

#@csrf_exempt
def signin(request):
    '''
    signin : django default user
    '''
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())["body"]
        username = req_data["username"]
        password = req_data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)

        return HttpResponse(status=401)
    return HttpResponseNotAllowed(['POST'], status=405)


# @csrf_exempt
def signout(request):
    '''
    signout : django default user
    '''
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        return HttpResponse('Unauthorized', status=401)
    return HttpResponseNotAllowed(['GET'], status=405)


def userinfo(request):
    '''
    userinfo : for edit user infomation

    '''
    if not request.user.is_authenticated:
        return HttpResponse('Unauthorized', status=401)
    
    user = User.objects.get(username = request.user.username)
    if request.method == 'GET':
        data = {'username': request.user.username,}
        return HttpResponse(data, status=200)

    if request.method == 'PUT':
        try:
            req_data = json.loads(request.body.decode())["body"]
            password = req_data['password']

        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)
        
        ## 여기가 왜 안되지?
        # user.set_password(password)
        # user.save()
        request.user.set_password(password)
        request.user.save()
        name = request.user.username
        user = authenticate(request, username=name, password=password)

        if user is None:
            return HttpResponse(status=404)
        
        login(request, user)
        return HttpResponse(status=204)
        
    if request.method == 'DELETE':
        # user.delete()
        request.user.delete()
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'], status=405)

#@csrf_exempt
def closets(request):
    '''
    closet : get or create user's closet items
    '''
    if not request.user.is_authenticated:
        return HttpResponse('Unauthorized', status=401)
    user = User.objects.get(id=request.user.id)
    user_closet = Closet.objects.get(user=user)

    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)

        closet_item_list = UserCloth.objects.filter(closet=user_closet)
        json_closet_list = []
        for item in closet_item_list:
            closet_serialize = UserClothSerializer(item)
            json_closet = {
                "id" : closet_serialize.data['id'],
                "name": closet_serialize.data['name'],
                "image_link" : closet_serialize.data['image'],
                #"user": request.user.id,
                "color": closet_serialize.data['color'],
                "type":closet_serialize.data['type'],
                "pattern":closet_serialize.data['pattern'],
                "dates":closet_serialize.data['dates']
            }
            json_closet_list.append(json_closet)
        return JsonResponse(json_closet_list, safe=False)
    if request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)
        try:
            #req_data = json.loads(request.body.decode())["body"]

            #name = req_data['name']
            #image = req_data['image']
            #closet = user_closet
            #type = req_data['type']
            #color = req_data['color']
            #pattern = req_data['pattern']

            #label_set_obj, _ = LabelSet.objects.get_or_create(
            #    type=type, color=color, pattern=pattern
            #)
            #label_set = label_set_obj
            name = request.POST['name']
            image_link = request.FILES.get('image')
            input_type = request.POST['type']
            color = request.POST['color']
            pattern = request.POST['pattern']
            label_set_obj, _ = LabelSet.objects.get_or_create(
                type = input_type, color = color, pattern= pattern
            )
            label_set = label_set_obj
        except (KeyError, JSONDecodeError) as error:
            print(error)
            return HttpResponseBadRequest()

        closet_new_item = UserCloth(
            name=name,
            image_link=image_link,
            closet=user_closet,
            type=input_type,
            color=color,
            pattern=pattern,
            label_set=label_set,
            # dates - created as default value []
        )
        closet_new_item.save()
        return HttpResponse(status=200)

    return HttpResponseNotAllowed(['GET', 'POST'], status=405)

#@csrf_exempt
def closet_item(request, cloth_id):
    '''
    closet_item : get, edit or delete user's closet item / post date a user wore the cloth
    '''
    if not request.user.is_authenticated:
        return HttpResponse('Unauthorized', status=401)

    try:
        target_item_obj = UserCloth.objects.get(id=cloth_id)
        json_dec = json.decoder.JSONDecoder()
        if target_item_obj.dates == '':
            dates_history = []
        else:
            dates_history = json_dec.decode(target_item_obj.dates)
    except UserCloth.DoesNotExist:
        return HttpResponseNotFound()

    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)

        try:
            target_item_dict = UserCloth.objects.filter(id=cloth_id).values()[0]
        except UserCloth.DoesNotExist:
            return HttpResponseNotFound()
        closet_serialize = UserClothSerializer(target_item_dict)
        json_closet = {
            "id" : closet_serialize.data['id'],
            "name": closet_serialize.data['name'],
            "image_link" : closet_serialize.data['image'],
            #"user": request.user.id,
            "color": closet_serialize.data['color'],
            "type":closet_serialize.data['type'],
            "pattern":closet_serialize.data['pattern'],
            "dates":closet_serialize.data['dates']
        }
        return JsonResponse(json_closet)

    if request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)

        try:
            req_data = json.loads(request.body.decode())["body"]
            dates = req_data['dates']
        except (KeyError, JSONDecodeError) as error:
            print(error)
            return HttpResponseBadRequest()

        if dates not in dates_history:
            dates_history.append(dates)
            target_item_obj.dates = json.dumps(dates_history)

            target_item_obj.save()

        return HttpResponse(status=200)

    if request.method == 'PUT':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)

        try:
            req_data = json.loads(request.body.decode())["body"]

            input_type = req_data['type']
            color = req_data['color']
            pattern = req_data['pattern']

            label_set_obj, _ = LabelSet.objects.get_or_create(
                type=input_type, color=color, pattern=pattern
            )
            label_set = label_set_obj
            # old_date = req_data['old_date']
            # new_date = req_data['new_date']
        except (KeyError, JSONDecodeError) as error:
            print(error)
            return HttpResponseBadRequest()

        target_item_obj.type = input_type
        target_item_obj.color = color
        target_item_obj.pattern = pattern
        target_item_obj.label_set = label_set

        # if old_date in dates_history:
        #     old_date_idx = dates_history.index(old_date)
        #     dates_history[old_date_idx] = new_date
        # else:
        #     dates_history.append(new_date)
        # target_item_obj.dates = json.dumps(dates_history)

        target_item_obj.save()


        closet_serialize = UserClothSerializer(target_item_obj)
        json_closet = {
            "id" : closet_serialize.data['id'],
            "name": closet_serialize.data['name'],
            "image_link" : closet_serialize.data['image'],
            #"user": request.user.id,
            "color": closet_serialize.data['color'],
            "type":closet_serialize.data['type'],
            "pattern":closet_serialize.data['pattern'],
            "dates":closet_serialize.data['dates']
        }
        return JsonResponse(json_closet, status=200)

    if request.method == 'DELETE':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)

        try:
            target_item_obj.delete()
            return HttpResponse(status=200)
        except (KeyError, JSONDecodeError) as error:
            print(error)
            return HttpResponseBadRequest()

    return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'], status=405)

@ensure_csrf_cookie
def token(request):
    '''
    get csrf token
    '''
    if request.method == 'GET':
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET'], status=405)

#outfit part start
# @ensure_csrf_cookie
#@csrf_exempt
def outfit_list(request):
    '''
        filter outfit
    '''
    
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)
        
        cursor = int(request.GET.get('cursor', '99999999999999').replace('/',''))
        page_size = int(request.GET.get('pageSize', '3').replace('/',''))
        all_outfits = list(Outfit.objects.all().order_by("-popularity"))
        outfits_count = len(all_outfits)
        response_outfit_range = min(outfits_count, cursor + page_size + 1)
        
        if min(outfits_count, cursor + page_size + 1) == outfits_count:
            cursor = 0
            response_outfit_range = 12
        
        outfits = all_outfits[cursor:response_outfit_range]
        # outfit_list = all_outfits[0:1]
        is_last = False

        if len(outfits) != page_size + 1:
            is_last = True
        
        if not is_last:
            outfits.pop()
            new_cursor = cursor + page_size
        else:
            new_cursor = 0
        
        json_outfit_list = []
        for outfit_item in outfits:
            outfit_serialize = OutfitSerializer(outfit_item)
            json_outfit = {
                "id" : outfit_serialize.data['id'],
                "outfit_info": outfit_serialize.data['outfit_info'],
                "popularity" : outfit_serialize.data['popularity'],
                "image_link": outfit_serialize.data['image'],
                "purchase_link": outfit_serialize.data['purchase_link']
            }
            json_outfit_list.append(json_outfit)

        content = {
            'isLast': is_last,
            'cursor': new_cursor,
            'outfits': json_outfit_list
        }
        return JsonResponse(content, status=200)

    if request.method == 'POST':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)

        try:
            req_data = json.loads(request.body.decode())["body"]
            cursor = int(req_data["cursor"])
            page_size = int(req_data["pageSize"])
            filter_type = req_data["type"]
            filter_color = req_data["color"]
            filter_pattern = req_data["pattern"]
            filter_userhave = req_data["userHave"]
            filter_recommend = req_data["recommend"]
        except (KeyError, JSONDecodeError) as error:
            return HttpResponseBadRequest(error)

        print(filter_recommend)

        using_labelset = False

        if filter_type and filter_color and filter_pattern:
            #check filter is using whole 3 tags
            try:
                filter_labelset = LabelSet.objects.get(
                    Q(type=filter_type) & Q(color=filter_color) & Q(pattern=filter_pattern))
                using_labelset = True
            except LabelSet.DoesNotExist:
                using_labelset = False

        closet = Closet.objects.get(user=request.user)

        if filter_recommend is True or filter_userhave is True:
            usercloth_list = list(UserCloth.objects.filter(closet=closet))

            labelset_list = []
            for usercloth in usercloth_list:
                labelset_list.append(usercloth.label_set)
            
            labelset_list = list(set(labelset_list))

            samplecloth_list = []
            for labelset in labelset_list:
                sampleclothes = list(SampleCloth.objects.filter(label_set=labelset))
                samplecloth_list = samplecloth_list + sampleclothes

            if using_labelset:
                
                filtered_samplecloth_list = [x for x in samplecloth_list 
                    if x.label_set == filter_labelset]
            else:
                filtered_samplecloth_list = samplecloth_list
                if filter_type:
                    filtered_samplecloth_list = [x for x in samplecloth_list 
                        if x.type == filter_type]
                if filter_color:
                    filtered_samplecloth_list = [x for x in samplecloth_list 
                        if x.color == filter_color]
                if filter_pattern:
                    filtered_samplecloth_list = [x for x in samplecloth_list 
                        if x.pattern == filter_pattern]

            all_outfits = []
            for samplecloth in filtered_samplecloth_list:
                samplecloth_include_outfit = list(samplecloth.outfit.all())
                all_outfits = all_outfits + samplecloth_include_outfit

            all_outfits = list(set(all_outfits))
            all_outfits = sorted(all_outfits, key=lambda outfit: outfit.popularity, reverse=True)
            if filter_recommend == True or filter_recommend == "True":
                recommend = []
                for outfit_item in all_outfits:
                    outfit_cloth_list = list(outfit_item.sample_cloth.all())

                    can_recommend = True
                    for cloth in outfit_cloth_list:
                        if not cloth in samplecloth_list:
                            can_recommend = False
                    if can_recommend:
                        recommend.append(outfit_item)   
                all_outfits = recommend
 
        elif filter_type or filter_color or filter_pattern:
            #No userHave, recommend filter

            if using_labelset:
                samplecloth_list = SampleCloth.objects.filter(label_set = filter_labelset)
            else:
                samplecloth_list = SampleCloth.objects.all()
                if filter_type:
                    samplecloth_list = [x for x in samplecloth_list if x.type == filter_type]
                if filter_color:
                    samplecloth_list = [x for x in samplecloth_list if x.color == filter_color]
                if filter_pattern:
                    samplecloth_list = [x for x in samplecloth_list if x.pattern == filter_pattern]
            all_outfits = []
            # print(samplecloth_list)

            for samplecloth in samplecloth_list:
                samplecloth_include_outfit = list(samplecloth.outfit.all())
                all_outfits = all_outfits + samplecloth_include_outfit
            # print(all_outfits)
            all_outfits = list(set(all_outfits))
            all_outfits = sorted(all_outfits, key=lambda outfit: outfit.popularity, reverse=True)
        
        else:
            all_outfits = list(Outfit.objects.all().order_by("-popularity"))
            all_outfits = list(set(all_outfits))

        outfits_count = len(all_outfits)
        response_outfit_range = min(outfits_count, cursor + page_size + 1)

        outfits = all_outfits[cursor:response_outfit_range]

        is_last = False

        if len(outfits) != page_size + 1:
            is_last = True
        
        if not is_last:
            outfits.pop()
            new_cursor = cursor + page_size
        else:
            new_cursor = 0

        json_outfit_list = []
        for outfit_item in outfits:
            outfit_serialize = OutfitSerializer(outfit_item)
            json_outfit = {
                "id" : outfit_serialize.data['id'],
                "outfit_info": outfit_serialize.data['outfit_info'],
                "popularity" : outfit_serialize.data['popularity'],
                "image_link": outfit_serialize.data['image'],
                "purchase_link": outfit_serialize.data['purchase_link']
            }
            json_outfit_list.append(json_outfit)

        content = {
            'type': filter_type,
            'color': filter_color,
            'pattern': filter_pattern,
            'useLabelSet': using_labelset,
            'userHave': filter_userhave,
            'recommend': filter_recommend,
            'isLast': is_last,
            'cursor': new_cursor,
            'outfits': json_outfit_list
        }

        # print(content)
        

        return JsonResponse(content, status=200)


    return HttpResponseNotAllowed(['GET', 'POST'], status=405)

# @ensure_csrf_cookie
#@csrf_exempt
def outfit(request, outfit_id):
    """
        get all outfit 
    """
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)

        try:
            outfit_item = Outfit.objects.get(id=outfit_id)
        except Outfit.DoesNotExist:
            return HttpResponseNotFound()

        sample_cloth_list = SampleCloth.objects.filter(outfit=outfit_item)

        outfit_serialize = OutfitSerializer(outfit_item)

        json_outfit = {
            "id" : outfit_serialize.data['id'],
            "outfit_info": outfit_serialize.data['outfit_info'],
            "popularity" : outfit_serialize.data['popularity'],
            "image_link": outfit_serialize.data['image'],
            "purchase_link": outfit_serialize.data['purchase_link']
        }

        json_samplecloth_list = []
        for samplecloth in sample_cloth_list:
            samplecloth_outfit_list = samplecloth.outfit.all()
            samplecloth_outfit_ids = [outfit.id for outfit in samplecloth_outfit_list]
            samplecloth_serialize = SampleClothSerializer(samplecloth)
            # print('start')
            json_samplecloth = {
                "id": samplecloth_serialize.data['id'],
                "name": samplecloth_serialize.data['name'],
                "image_link": samplecloth_serialize.data['image'],
                "purchase_link": samplecloth_serialize.data['purchase_link'],
                "outfit": samplecloth_outfit_ids,
                "type": samplecloth_serialize.data['type'],
                "color": samplecloth_serialize.data['color'],
                "pattern": samplecloth_serialize.data['pattern']

            }
            # print(json_samplecloth)
            json_samplecloth_list.append(json_samplecloth)

        content = {
            'outfit': json_outfit,
            "sampleclothes": json_samplecloth_list
        }
        # print(json_samplecloth_list)
        return JsonResponse(content, status=200)

    return HttpResponseNotAllowed(['GET'], status=405)

# @ensure_csrf_cookie
#@csrf_exempt
def sample_cloth(request, samplecloth_id):

    '''
    response with chosen samplecloth data and usercloth data
    that have same labelset
    '''

    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)
        try:
            samplecloth = SampleCloth.objects.get(id=samplecloth_id)
        except SampleCloth.DoesNotExist:
            return HttpResponseNotFound()
        
        

        user_closet = Closet.objects.get(user=request.user)
        try:
            usercloth = UserCloth.objects.get(Q(closet=user_closet) 
                & Q(label_set=samplecloth.label_set))
            usercloth_serialize = UserClothSerializer(usercloth)
            json_usercloth = {
                "id": usercloth_serialize.data['id'],
                "name": usercloth_serialize.data['name'],

                "image_link": usercloth_serialize.data['image'],
                "type": usercloth_serialize.data['type'],
                "color": usercloth_serialize.data['color'],
                "pattern": usercloth_serialize.data['pattern'],
                "user" : usercloth.closet.user.id,
                "dates" : usercloth.dates
            }
        except UserCloth.DoesNotExist:
            json_usercloth = {
                "id": -1,
                "name": "",
                "image_link": "",
                "type": "",
                "color": "",
                "pattern": "",
                "user" : -1,
                "dates" : "",
            }

        samplecloth_outfit_list = samplecloth.outfit.all()
        samplecloth_outfit_ids = [outfit.id for outfit in samplecloth_outfit_list]
        
        samplecloth_serialize = SampleClothSerializer(samplecloth)
        json_samplecloth = {
            "id": samplecloth_serialize.data['id'],
            "name": samplecloth_serialize.data['name'],
            "image_link": samplecloth_serialize.data['image'],
            "purchase_link": samplecloth_serialize.data['purchase_link'],
            "outfit": samplecloth_outfit_ids,
            "type": samplecloth_serialize.data['type'],
            "color": samplecloth_serialize.data['color'],
            "pattern": samplecloth_serialize.data['pattern']
        }
        
        content = {
            "usercloth": json_usercloth,
            "samplecloth": json_samplecloth
        }
        
        # print(content)
        return JsonResponse(content, status=200)

    return HttpResponseNotAllowed(['GET'], status=405)

# @ensure_csrf_cookie
#@csrf_exempt
def today_outfit(request):
    '''
    recommend today_outfit by check usercloth tags and wear dates
    '''
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return HttpResponse('Unauthorized', status=401)

        users_closet = Closet.objects.get(user=request.user)
        usercloth_list = list(UserCloth.objects.filter(closet=users_closet))
        
        today = date.today()
        three_day = timedelta(days=3)
        zero_day = timedelta(days=0)

        json_dec = json.decoder.JSONDecoder()

        clean_usercloth_list = []
        for usercloth in usercloth_list:
            if usercloth.dates == '':
                usercloth_days = []
            else:
                usercloth_days = json_dec.decode(usercloth.dates)
            if len(usercloth_days) == 0:
                clean_usercloth_list.append(usercloth)
            else: 
                last_day = date.fromisoformat(usercloth_days[len(usercloth_days)-1])
                #if today == last_day, it is OK to recommend
                # print("day print",today)
                # print(last_day)
                # print(today - last_day)
                if (today - last_day) > three_day and (today - last_day) != zero_day:
                    clean_usercloth_list.append(usercloth)

        labelset_list = []
        for usercloth in clean_usercloth_list:
            labelset_list.append(usercloth.label_set)
        
        labelset_list = list(set(labelset_list))

        samplecloth_list = []
        for labelset in labelset_list:
            sampleclothes = list(SampleCloth.objects.filter(label_set=labelset))
            samplecloth_list = samplecloth_list + sampleclothes

        
        all_outfits = []
        for samplecloth in samplecloth_list:
            samplecloth_include_outfit = list(samplecloth.outfit.all())
            all_outfits = all_outfits + samplecloth_include_outfit


        outfits = list(set(all_outfits))
        outfits = sorted(outfits, key=lambda outfit: outfit.popularity, reverse=True)

        recommend = []
        recommend_samplecloth_list = []
        recommend_usercloth_list = []

        for outfit_item in outfits:
            outfit_cloth_list = list(outfit_item.sample_cloth.all())

            can_recommend = True
            for cloth in outfit_cloth_list:
                if not cloth in samplecloth_list:
                    can_recommend = False
            check_samplecloth_cnt = SampleCloth.objects.filter(outfit=outfit_item)
            if len(check_samplecloth_cnt) < 2:
                can_recommend = False
            if can_recommend:
                recommend.append(outfit_item)
                recommend_samplecloth_list = outfit_cloth_list
                break
        
        for recommend_samplecloth in recommend_samplecloth_list:
            #should not user Usercloth filter or get.
            #It should find usercloth in clean_usercloth_list
            recommend_usercloth = [usercloth for usercloth in clean_usercloth_list 
                if usercloth.label_set == recommend_samplecloth.label_set]
            recommend_usercloth = recommend_usercloth[0:1]
            recommend_usercloth_list = recommend_usercloth_list + recommend_usercloth
        json_userclothes = []

        for recommend_usercloth in recommend_usercloth_list:
            usercloth_serialize = UserClothSerializer(recommend_usercloth)
            json_usercloth = {
                "id": recommend_usercloth.id,
                "name": recommend_usercloth.name,
                "image_link": usercloth_serialize.data['image'],
                "type": recommend_usercloth.type,
                "color": recommend_usercloth.color,
                "pattern": recommend_usercloth.pattern,
                "user" : recommend_usercloth.closet.user.id,
                "dates" : recommend_usercloth.dates
            }
            json_userclothes.append(json_usercloth)

        if not recommend:
            return HttpResponse(status=404)
        outfit_serialize = OutfitSerializer(recommend[0])
        json_outfit = {
            "id" : outfit_serialize.data['id'],   
            "outfit_info": outfit_serialize.data['outfit_info'],
            "popularity" : outfit_serialize.data['popularity'],
            "image_link": outfit_serialize.data['image'],
            "userclothes" : json_userclothes
        }
        return JsonResponse(json_outfit, status=200)
            
    return HttpResponseNotAllowed(['GET'], status=405)

#outfit part end
