const reviewsRequestUrl: string = '/api/reviews?productID=';

export default async function GetReviewsData(productID: number) {
    let reviewsData = await fetch(reviewsRequestUrl + productID);
    return await reviewsData.json();
}