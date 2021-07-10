const lists = [
    {
        'id': 123456789,
        'name': 'Luke Skywalker'
    },
    {
        'id': 123456782,
        'name': 'Yoda'
    }
]

const date = new Date()

const status = {
	'ok': 200,
	'created': 201,
	'notModified': 304,
	'notFound': 404
}

exports.get = (route, queries) => {
    console.log(route)
    switch (route) {
        case "/":
            return { 'code': status.ok, 'body': lists };
        case "/lists":
            if (queries.listID == null) {
                return { 'code': status.ok, 'body': lists };
            } else {
                var listID = queries.listID
                var matchingID = -1

                if (lists === undefined)
                    return { 'code': status.notFound, 'body': { msg: 'no lists found' } };

                for (let i=0; i< lists.length; i++) {
                    if (lists[i].id == listID) matchingID = i
                }
                
                if (matchingID === -1)
                    return { 'code': status.notFound, 'body': { msg: `list with id ${listID} not found` } };
                
                return { 'code': status.ok, 'body': lists[matchingID] };
            }
        case "/count":
            return { 'code': status.ok, 'body': lists.count() }
        default:
            return { 'code': 400, 'body': 'Bad Request' };
    }
}
exports.post = (route, queries) => {
    console.log(route)
    switch (route) {
        case "/lists":
            if (queries.name == null) {
                return { 'code': status.notFound, 'body': { msg: 'invalid list data' } };
            } else {
                var name = queries.name
                var matchingName = -1

                for (let i=0; i< lists.length; i++) {
                    if (lists[i].name == name) matchingName = i
                }
                
                if (matchingName == -1) {
                    const list = { id: new Date().valueOf(), name: name }
                    lists.push(list)
                    return { 'code': status.created, 'body': list };
                } else {
                    return { 'code': status.notFound, 'body': { msg: 'name already exists' } };
                }
            }
        default:
            return { 'code': 400, 'body': 'Bad Request' };
    }
}
exports.put = (route, queries) => {
    console.log(route)
    switch (route) {
        case "/lists":
            if (queries.listID == null || queries.name == null) {
                return { 'code': status.notFound, 'body': { msg: 'invalid list data' } };
            } else {
                var listID = queries.listID
                var name = queries.name
                var matchingID = -1

                if (lists === undefined)
                    return { 'code': status.notFound, 'body': { msg: 'no lists found' } };

                for (let i=0; i< lists.length; i++) {
                    if (lists[i].id == listID) matchingID = i
                    lists.splice(i, 1)

                    const list = { id: new Date().valueOf(), name: name }
                    lists.push(list)
                    return { 'code': status.ok, 'body': list };
                }
                
                if (matchingID === -1)
                    return { 'code': status.notFound, 'body': { msg: `list with id ${listID} not found` } };
                
                return { 'code': status.ok, 'body': lists[matchingID] };
            }
        default:
            return { 'code': 400, 'body': 'Bad Request' };
    }
}
exports.delete = (route, queries) => {
    console.log(route)
    switch (route) {
        case "/lists":
            if (queries.listID == null) {
                return { 'code': status.notFound, 'body': { msg: 'invalid list data' } };
            } else {
                var listID = queries.listID
                var matchingID = -1

                if (lists === undefined)
                    return { 'code': status.notFound, 'body': { msg: 'no lists found' } };

                for (let i=0; i< lists.length; i++) {
                    if (lists[i].id == listID) matchingID = i
                    lists.splice(i, 1)
                }
                
                if (matchingID === -1)
                    return { 'code': status.notFound, 'body': { msg: `list with id ${listID} not found` } };
                
                return { 'code': status.ok, 'body': { msg: `this should delete the specified resource` } };
            }
        case "/deleteAll":
            if (lists === undefined)
                return { 'code': status.notFound, 'body': { msg: 'no lists found' } };

            for (let i=0; i< lists.length; i++) {
                lists.splice(i, 1)
            }
            
            return { 'code': status.ok, 'body': { msg: `this should delete the all resource` } };
        default:
            return { 'code': 400, 'body': 'Bad Request' };
    }
}