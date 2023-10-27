/**
 * Simulates a very slow like API
 * @param liked has the user liked the content
 * @param errorRate From 0 to 1, how likely is the request to fail
 * @returns New like count
 */
export async function serverLike(liked = true, errorRate: number = 0.3) {
  return new Promise<{ liked: boolean; numberOfLikes: number }>(
    (resolve, reject) => {
      setTimeout(() => {
        const t = Math.random();
        console.log("rand", t, 1 - Math.max(0, Math.min(errorRate, 1)));
        if (t > 1 - Math.max(0, Math.min(errorRate, 1))) reject();
        else resolve({ liked, numberOfLikes: liked ? 6 : 5 });
      }, 5000);
    }
  );
}
