# API INFO

HOSTNAME: 52.14.226.1:8080

Account:
    /api/accounts
        Body: {
            firstName: String
            lastName: String
            email: String
        }

    /api/accounts/:account_id
        param: {
            account_id: _id
        }


Family:
    /api/families
        Body: {
            parents: array
            childrens: array
        }

    /api/families/:family_id
        param: {
            account_id: _id
        }

