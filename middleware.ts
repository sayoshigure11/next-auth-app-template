//リクエストを出す前とかリクエストが完了する前になんらかの処理をするもの
export { auth as middleware } from "@/auth"

//この状態だと全てのページにミドルウェアが発火しているらしい

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}

//matcherは正規表現でも書ける。普通にmatcher: "/profile"などのようにURIで書いてもよい。
//matcherに書いた部分はミドルウェアが発火しないようになる。

