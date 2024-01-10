/**
 * Backend URL
 */
const BASE_URL = 'http://localhost:3002';

/**
 * Function to register new users
 * @param {*} userData 
 * @returns Registered user data
 */
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return response.json();
    } catch (error) {
        throw error;
    }
};

/**
 * Function to login as a user
 * @param {*} userData 
 * @returns Login user data
 */
export const loginUser = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}


/**
 * Function to get the list of users
 * @returns Array of user usernames
 */
export const getUsers = async () => {
    try {
        const response = await fetch('http://localhost:3002/api/users');
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }
        return response.json();
    } catch (error) {
        throw error;
    }
};

/**
 * Function to get all messages
 * @returns Array of messages
 */
// export const getMessages = async (currentUser, recipientUser) => {
//     try {
//         const response = await fetch(`http://localhost:3002/api/messages?currentUser=${currentUser}&recipientUser=${recipientUser}`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch messages');
//         }
//         return response.json();
//     } catch (error) {
//         throw error;
//     }
// };
export const getMessages = async (currentUser, recipientUser) => {
    try {
        const response = await fetch(`http://localhost:3002/api/messages?currentUser=${currentUser}&recipientUser=${recipientUser}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }

        const messages = await response.json();
        console.log('API Response (getMessages):', messages);

        return messages || [];  // Return an empty array if messages is falsy
    } catch (error) {
        console.error('Error in getMessages:', error);
        throw error;
    }
};

/**
 * Function to send a message
 * @param {*} messageData 
 * @returns Sent message data
 */
// export const sendMessage = async (messageData) => {
//     try {
//         const response = await fetch('http://localhost:3002/api/messages', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(messageData),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to send message');
//         }

//         return response.json();
//     } catch (error) {
//         throw error;
//     }
// };
export const sendMessage = async (messageData) => {
    try {
        const response = await fetch('http://localhost:3002/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
        });

        if (!response.ok) {
            console.error('Server response error:', response.status, response.statusText);
        }

        const responseData = await response.json();
        console.log('Server confirmation:', responseData);

        return responseData;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};


