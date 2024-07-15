import Cookie from 'js-cookie'

export const removeCookie = (name: string) => {
  Cookie.remove(name);
};