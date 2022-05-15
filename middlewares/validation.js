const {query} = require('express-validator');

exports.validate = (method) => {
    switch(method){
        case 'K-nearest':
            return[
                query('lon', 'انتخا نوع خودرو اجباری است').exists().isNumeric(),//x
                query('lat', 'خطای ورودی SPN').exists().isNumeric()//y
            ]
    }
}