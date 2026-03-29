import http from "./http";

const makeToken = () => `mock-token-${Date.now()}`;

export const loginApi = async ({ emailOrMobile, password }) => {
  const { data } = await http.get("/users");

  const user = data.find((item) => {
    const matchId = item.email === emailOrMobile || item.mobile === emailOrMobile;
    const matchPass = item.password === password;
    return matchId && matchPass
  });

  if(!user){
    throw new Error ('اطلاعات وارد شده نادرست است.')
  }

  return {
    token:makeToken(),
    user
  }
};

export const registerApi = async (payload)=>{
  const {data:users} = await http.get('/users')
  const duplicated = users.some((item) => item.email === payload.email || item.mobile === payload.moblie )

  if(duplicated){
    throw new Error ("کاربر با این ایمیل یا موبایل وجود دارد.")
  }

  const now = new Data().toISOString()
  const reqBody = {
    ...payload,
    role:'viewer',
    status:"active",
    createAt : now,
    updatedAt:now
  }

  const {data} = await http.post("/users" , reqBody)

  return{
    token:makeToken(),
    user : data
  }
}

export const fetchMeApi = async(userId)=> {
const {data} = await http.get(`/users/${userId}`)
return data
}
