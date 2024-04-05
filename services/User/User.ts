import User from "../../models/User"

export const register = async (userInfo: { first_name: string, last_name: string, user_name: string, password: string}) => {
    try {
      const user = await User.create({
        username: userInfo.user_name.toLowerCase(),
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        password: userInfo.password,
      })
      if (!user) {
        return
      }
  
      return {
        user: user.dataValues
      }
    } catch (error) {
      return error
    }
  }

export const getUserById = async (userId: number | undefined) => {
  try {
    const user = await User.findOne({
      where: {
        id: userId
      },
      attributes: {
        exclude: ['password']
      }
    })

    if (!user) {
      return
    }

    return user.dataValues
  } catch (error) {
    console.error(error)
  }
}

export const getUserByUserName = async (username: string) => {
  try {
    console.log("username ,,,, ", username)
    const user = await User.findOne({
      where: {
        user_name: username
      },
    })

    if (!user) {
      return
    }

    return user.dataValues
  } catch (error) {
    console.error(error)
  }
}

export default {
  register,
  getUserById,
  getUserByUserName
}
