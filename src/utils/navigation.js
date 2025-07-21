import { encryptParam, createEncryptedUrl } from "@/utils/crypto";

export async function createBusSearchUrl(searchData) {
  return await createEncryptedUrl("/buses", {
    fromCity: searchData.fromCity,
    toCity: searchData.toCity,
    travelDate: searchData.travelDate,
  });
}

export async function createSeatSelectionUrl(busId) {
  return await createEncryptedUrl("/seat", {
    busId: busId,
  });
}

export async function createPaymentUrl(busId) {
  return await createEncryptedUrl("/payment", {
    busId: busId,
  });
}

export async function createEncryptedNavUrl(path, params) {
  return await createEncryptedUrl(path, params);
}

export async function navigateWithEncryptedParams(
  router,
  path,
  params,
  options = {}
) {
  const encryptedUrl = await createEncryptedUrl(path, params);

  if (options.replace) {
    router.replace(encryptedUrl);
  } else {
    router.push(encryptedUrl);
  }
}

export async function addEncryptedParams(router, params) {
  const currentPath = window.location.pathname;
  const currentSearch = new URLSearchParams(window.location.search);

  for (const [key, value] of Object.entries(params)) {
    if (value !== null && value !== undefined) {
      const encryptedValue = await encryptParam(String(value));
      currentSearch.set(key, encryptedValue);
    }
  }

  const newUrl = `${currentPath}?${currentSearch.toString()}`;
  router.replace(newUrl);
}
