#[repr(C)]
struct Test {
    a: i32,
    b: i32,
}

#[no_mangle]
pub fn main() {
    print("Hello from rust");

    let mut tests = vec![];
    for i in 0..100 {
        tests.push(Test { a: i, b: i + 10 })
    }

    print(format!("Tests allocated on the heap := {}", tests.len()).as_str());
}

extern "C" {
    pub fn _print(ptr: *const u8, len: usize);
}

fn print(message: &str) {
    unsafe {
        _print(message.as_ptr(), message.len());
    }
}
