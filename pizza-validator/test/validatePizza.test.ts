import { validatePizza } from '../src/validatePizza';

test('valid pizza', () => {
    const res = validatePizza({ size: 12, crust: 'normal' });
    expect(res.isPizza).toBe(true);
});

test('invalid pizza missing crust', () => {
    const res = validatePizza({ size: 12 });
    expect(res.isPizza).toBe(false);
});

test('invalid pizza banned topping', () => {
    const res = validatePizza({
        size: 12,
        crust: 'normal',
        toppings: ['chocolate']
    });
    expect(res.isPizza).toBe(false);
});
