module ore_forge::ore_forge {
    use std::signer;
    use std::string;

    const MAX_SUPPLY: u64 = 1_000_000_000;

    struct Treasury has key, store {
        balance: u64,
    }

    struct OreMintEvent has drop, store {
        amount: u64,
        minter: address,
    }

    public entry fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        assert!(admin_addr != @0x0, 0);
        move_to(admin, Treasury { balance: 0 });
    }

    public entry fun mint(admin: &signer, to: address, amount: u64) {
        let admin_addr = signer::address_of(admin);
        assert!(admin_addr == @ore_forge, 0);
        assert!(amount > 0, 1);
        assert!(amount <= MAX_SUPPLY, 2);
        emit(OreMintEvent { amount, minter: to });
    }

    public entry fun treasury_split(amount: u64) acquires Treasury {
        let treasury = borrow_global_mut<Treasury>(@ore_forge);
        treasury.balance = treasury.balance + amount;
    }
}
