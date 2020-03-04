# JSON用法及优点
3.2 彭雪珊 201611680168

## JSON是什么
JSON是一种轻量级的资料交换语言，多用于前后端的数据传递。换言之，将资料存储于JSON当中，在有需求的时候可以向其中捞取相应的资料。简单来说就是将JavaScript中的对象和数组用特定的语法写出来，再进行传递。


## JSON语法
JSON采用key-value来表示，不同属性之间需要用逗号隔开<br>
储存的值可以是：数字、字符串、数组、对象、布尔值和null<br>
例：
```
{"person": {
   "name": "Mike",
   "age": 22,
   "isStudent": true,
   "hobbies": {
     "sports": ["basketball", "volleyball", "tennis"],
     "videos": ["talkshow", "soapopera", "movie"]
   "phoneNumber": [
     "13579",
     "24680"
   ]
   }
}}
```

## JSON的优点
+ JSON轻量级的特点使其便于编写、传递和解析
+ JSON的语法特点使其更易读，便于肉眼检查错误
+ 支持多语言，如C，C#，Java，JavaScript，Python，PHP等
+ 访问数据十分便捷简单，比如:<br>要访问JSON文件中的名字：person.name；<br>访问第一个电话号码：person.phoneNumber[0]；<br>访问兴趣中最喜欢的体育运动：person.hobbies.sports[0]
