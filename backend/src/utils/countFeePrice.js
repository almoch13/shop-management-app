const countFeePrice = (price) => {
  const adminFee = price * 0.08;
  const cashbackFee = price * 0.02;
  const freeShippingFee = price * 0.04;
  const premiAsuranceFee = price * 0.005;
  const totalServiceFee =
    adminFee + cashbackFee + premiAsuranceFee + freeShippingFee;

  return price - totalServiceFee;
};

export default countFeePrice;
