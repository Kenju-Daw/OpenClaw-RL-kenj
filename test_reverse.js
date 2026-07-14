const original = "123456789";
const out = ["a", "b", "c"];
try {
  out.toReversed();
  console.log("toReversed is supported");
} catch (e) {
  console.log("toReversed is not supported");
}
