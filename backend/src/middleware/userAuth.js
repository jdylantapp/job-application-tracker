import admin from '../config/firebaseAdmin.js'

const userAuth = async (request, response, next) => {
    try {
        const authHeader = request.headers.authorization

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return response.status(401).json({error: "No token provided"})
        }

        const token = authHeader.split(' ')[1]
        const decodedToken = await admin.auth().verifyIdToken(token)

        request.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            name: decodedToken.name,
            picture: decodedToken.picture
        }

        next()
    }
    catch(error) {
        console.error('Auth error:', error)
        return response.status(401).json({error: 'Invalid or expired token'})
    }
    
}

export default userAuth
