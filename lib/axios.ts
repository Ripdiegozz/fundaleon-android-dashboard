import axios, { AxiosInstance, AxiosResponse } from "axios";

// Función para convertir keys de snake case a camel case
function convertSnakeToCamel(obj: { [key: string]: any }): { [key: string]: any } {
  const camelCaseObject: { [key: string]: any } = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_(\w)/g, (_, p1) => p1.toUpperCase());
      camelCaseObject[camelCaseKey] = obj[key];
    }
  }

  return camelCaseObject;
}

// Crear instancia de Axios
const makeRequest: AxiosInstance = axios.create({
  baseURL: "http://192.168.1.7:8080/",
  headers: {
    "Content-Type": "application/json",
    "Authorization": 'b4cc4910-36bc-4929-b7c7-351fd5704155'
  },
});

// Agregar interceptor para convertir keys de snake case a camel case
makeRequest.interceptors.response.use((response: AxiosResponse) => {
  // Convertir las keys de snake case a camel case en el cuerpo de la respuesta
  if (response.data.data && typeof response.data.data === "object") {
    response.data.data = convertSnakeToCamel(response.data.data);
  }
  return response;
}, (error) => {
  // Manejar errores de respuesta aquí si es necesario
  return Promise.reject(error);
});

export { makeRequest };
