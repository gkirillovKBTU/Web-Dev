export function shareProduct(productName: string, kaspiLink: string) {
  if(!kaspiLink || kaspiLink == "Unknown"){
    return {whatsappUrl: "", telegramUrl: ""}
  }
  const encodedLink = encodeURIComponent(kaspiLink);
  const encodedText = encodeURIComponent(`Check out this product: ${productName}`);

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Check out this product: ${kaspiLink}`)}`;
  const telegramUrl = `https://t.me/share/url?url=${encodedLink}&text=${encodedText}`;

  return { whatsappUrl, telegramUrl };
}