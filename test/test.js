var Nightmare = require('nightmare');
var should = require('chai').should();
var $ = require('jquery');

describe('Nightmare demo', function () {
    this.timeout(10000); // Set timeout to 10 seconds, instead of the original 2 seconds

    describe('剣士', function (done) {
        var s = { "": 0, "赤": 1, "橙": 2, "黄": 3, "緑": 4, "青": 5, "白": 6 };
        var w = {
            "大剣": 0,
            "太刀": 1,
            "片手剣": 2,
            "双剣": 3,
            "ハンマー": 4,
            "狩猟笛": 5,
            "ランス": 6,
            "ガンランス": 7,
            "スラッシュアックス": 8,
            "チャージアックス": 9,
            "操虫棍": 10,
            "ライトボウガン": 11,
            "ヘヴィボウガン": 12,
            "弓": 13
        };
        it('大剣', function (done) {
            new Nightmare({ show: false })
                .goto("https://ryoskate.jp/DamageCalculatorMHW/")
                .select('#form1 select[name=weapon]', w["大剣"])
                .type('#form1 input[name=attackPower]', '912')
                .select('#form1 select[name=sharpness]', s["青"])
                .select('#form1 select[name=attack]', 6)
                .evaluate(function () {
                    const baseAttack = $('#form1 input[name=expectedDamage]').val();
                    return baseAttack;
                })
                .end()
                .then(function (result) {
                    result.should.equal("256");
                    done();
                });
        });
        it('太刀', function (done) {
            new Nightmare({ show: false })
                .goto("https://ryoskate.jp/DamageCalculatorMHW/")
                .select('#form1 select[name=weapon]', w["太刀"])
                .type('#form1 input[name=attackPower]', '693')
                .select('#form1 select[name=sharpness]', s["青"])
                .select('#form1 select[name=non-elemental-boost]', 0)
                .select('#form1 select[name=Weakness-exploit]', 2)
                .select('#form1 select[name=maximum-might]', 2)
                .evaluate(function () {
                    const baseAttack = $('#form1 input[name=expectedDamage]').val();
                    return baseAttack;
                })
                .end()
                .then(function (result) {
                    result.should.equal("332");
                    done();
                });
        });
        it('片手剣', function (done) {
            new Nightmare({ show: false })
                .goto("https://ryoskate.jp/DamageCalculatorMHW/")
                .select('#form1 select[name=weapon]', w["片手剣"])
                .type('#form1 input[name=attackPower]', '266')
                .type('#form1 input[name=affinity]', '20')
                .select('#form1 select[name=sharpness]', s["青"])
                .type('#form1 input[name=elementalAttackPower-fencer]', '180')
                .select('#form1 select[name=critical-eye]', 2)
                .select('#form1 select[name=non-elemental-boost]', 0)
                .select('#form1 select[name=agitator]', 0)
                .evaluate(function () {
                    const baseAttack = $('#form1 input[name=expectedDamage]').val();
                    const elementAttack = $('#form1 input[name=expectedElementalDamage]').val();
                    return [baseAttack, elementAttack];
                })
                .end()
                .then(function (result) {
                    result.should.eql(["252", "19"]);
                    done();
                });
        });
        it('双剣', function (done) {
            new Nightmare({ show: false })
                .goto("https://ryoskate.jp/DamageCalculatorMHW/")
                .select('#form1 select[name=weapon]', w["双剣"])
                .type('#form1 input[name=attackPower]', '238')
                .type('#form1 input[name=affinity]', '15')
                .select('#form1 select[name=sharpness]', s["白"])
                .type('#form1 input[name=elementalAttackPower-fencer]', '150')
                .select('#form1 select[name=full-chage]', 2)
                .evaluate(function () {
                    const baseAttack = $('#form1 input[name=expectedDamage]').val();
                    const elementAttack = $('#form1 input[name=expectedElementalDamage]').val();
                    return [baseAttack, elementAttack];
                })
                .end()
                .then(function (result) {
                    result.should.eql(["260", "16"]);
                    done();
                });
        });
        it('ハンマー', function (done) {
            new Nightmare({ show: false })
                .goto("https://ryoskate.jp/DamageCalculatorMHW/")
                .select('#form1 select[name=weapon]', w["ハンマー"])
                .type('#form1 input[name=attackPower]', '1196')
                .type('#form1 input[name=affinity]', '-25')
                .select('#form1 select[name=sharpness]', s["青"])
                .type('#form1 input[name=elementalAttackPower-fencer]', '0')
                .select('#form1 select[name=critical-boost]', 2)
                .evaluate(function () {
                    const baseAttack = $('#form1 input[name=expectedDamage]').val();
                    const elementAttack = $('#form1 input[name=expectedElementalDamage]').val();
                    return [baseAttack, elementAttack];
                })
                .end()
                .then(function (result) {
                    result.should.eql(["248", ""]);//1345?
                    done();
                });
        });
        it('狩猟笛', function (done) {
            new Nightmare({ show: false })
                .goto("https://ryoskate.jp/DamageCalculatorMHW/")
                .select('#form1 select[name=weapon]', w["狩猟笛"])
                .type('#form1 input[name=attackPower]', '378')
                .type('#form1 input[name=affinity]', '0')
                .select('#form1 select[name=sharpness]', s["黄"])
                .type('#form1 input[name=elementalAttackPower-fencer]', '0')
                .evaluate(function () {
                    const baseAttack = $('#form1 input[name=expectedDamage]').val();
                    const elementAttack = $('#form1 input[name=expectedElementalDamage]').val();
                    return [baseAttack, elementAttack];
                })
                .end()
                .then(function (result) {
                    result.should.eql(["90", ""]);
                    done();
                });
        });
        it('ランス', function (done) {
            new Nightmare({ show: false })
                .goto("https://ryoskate.jp/DamageCalculatorMHW/")
                .select('#form1 select[name=weapon]', w["ランス"])
                .type('#form1 input[name=attackPower]', '391')
                .type('#form1 input[name=affinity]', '30')
                .select('#form1 select[name=sharpness]', s["白"])
                .type('#form1 input[name=elementalAttackPower-fencer]', '0')
                .select('#form1 select[name=critical-boost]', 0)
                .evaluate(function () {
                    const baseAttack = $('#form1 input[name=expectedDamage]').val();
                    const elementAttack = $('#form1 input[name=expectedElementalDamage]').val();
                    return [baseAttack, elementAttack];
                })
                .end()
                .then(function (result) {
                    result.should.eql(["244", ""]);
                    done();
                });
        });
        it('ガンランス', function (done) {
            new Nightmare({ show: false })
                .goto("https://ryoskate.jp/DamageCalculatorMHW/")
                .select('#form1 select[name=weapon]', w["ガンランス"])
                .type('#form1 input[name=attackPower]', '207')
                .type('#form1 input[name=affinity]', '0')
                .select('#form1 select[name=sharpness]', s["緑"])
                .type('#form1 input[name=elementalAttackPower-fencer]', '0')
                .select('#form1 select[name=latent-power]', 2)
                .evaluate(function () {
                    const baseAttack = $('#form1 input[name=expectedDamage]').val();
                    const elementAttack = $('#form1 input[name=expectedElementalDamage]').val();
                    return [baseAttack, elementAttack];
                })
                .end()
                .then(function (result) {
                    result.should.eql(["101", ""]);
                    done();
                });
        });
        it('スラッシュアックス', function (done) {
            new Nightmare({ show: false })
                .goto("https://ryoskate.jp/DamageCalculatorMHW/")
                .select('#form1 select[name=weapon]', w["スラッシュアックス"])
                .type('#form1 input[name=attackPower]', '700')
                .type('#form1 input[name=affinity]', '0')
                .select('#form1 select[name=sharpness]', s["青"])
                .type('#form1 input[name=elementalAttackPower-fencer]', '150')
                .evaluate(function () {
                    const baseAttack = $('#form1 input[name=expectedDamage]').val();
                    const elementAttack = $('#form1 input[name=expectedElementalDamage]').val();
                    return [baseAttack, elementAttack];
                })
                .end()
                .then(function (result) {
                    result.should.eql(["240", "15"]);
                    done();
                });
        });
        it('チャージアックス', function (done) {
            new Nightmare({ show: false })
                .goto("https://ryoskate.jp/DamageCalculatorMHW/")
                .select('#form1 select[name=weapon]', w["チャージアックス"])
                .type('#form1 input[name=attackPower]', '828')
                .type('#form1 input[name=affinity]', '-30')
                .select('#form1 select[name=sharpness]', s["青"])
                .type('#form1 input[name=elementalAttackPower-fencer]', '0')
                .select('#form1 select[name=non-elemental-boost]', 0)
                .select('#form1 select[name=Weakness-exploit]', 2)
                .evaluate(function () {
                    const baseAttack = $('#form1 input[name=expectedDamage]').val();
                    const elementAttack = $('#form1 input[name=expectedElementalDamage]').val();
                    return [baseAttack, elementAttack];
                })
                .end()
                .then(function (result) {
                    result.should.eql(["318", ""]);
                    done();
                });
        });
        it('操虫棍', function (done) {
            new Nightmare({ show: false })
                .goto("https://ryoskate.jp/DamageCalculatorMHW/")
                .select('#form1 select[name=weapon]', w["操虫棍"])
                .type('#form1 input[name=attackPower]', '651')
                .type('#form1 input[name=affinity]', '0')
                .select('#form1 select[name=sharpness]', s["青"])
                .type('#form1 input[name=elementalAttackPower-fencer]', '150')
                .select('#form1 select[name=elemental-crit]', 0)
                .evaluate(function () {
                    const baseAttack = $('#form1 input[name=expectedDamage]').val();
                    const elementAttack = $('#form1 input[name=expectedElementalDamage]').val();
                    return [baseAttack, elementAttack];
                })
                .end()
                .then(function (result) {
                    result.should.eql(["252", "19"]);
                    done();
                });
        });
    });
});