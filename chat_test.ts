import { assertStrictEq } from "https://deno.land/std/testing/asserts.ts";
import { testMe } from "./chat.ts";

Deno.test("2 + 2 returns 4", () => assertStrictEq(testMe(2, 2), 4));
