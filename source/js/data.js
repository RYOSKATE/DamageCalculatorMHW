var data = {
    "weapon": [
        { "name": "大剣", "value": 4.8 },
        { "name": "太刀", "value": 3.3 },
        { "name": "片手剣", "value": 1.4 },
        { "name": "双剣", "value": 1.4 },
        { "name": "ハンマー", "value": 5.2 },
        { "name": "狩猟笛", "value": 4.2 },
        { "name": "ランス", "value": 2.3 },
        { "name": "ガンランス", "value": 2.3 },
        { "name": "スラッシュアックス", "value": 3.5 },
        { "name": "チャージアックス", "value": 3.6 },
        { "name": "操虫棍", "value": 3.1 },
        { "name": "ライトボウガン", "value": 1.3 },
        { "name": "ヘヴィボウガン", "value": 1.5 },
        { "name": "弓", "value": 1.2 },
    ],
    "sharpnesses": [
        { "name": "", "value": { "物": 1.0, "属": 1.0 }, "bg-color": "rgb(200, 200, 200)" },
        { "name": "赤", "value": { "物": 0.5, "属": 0.25 }, "bg-color": "rgb(255, 153, 204)" },
        { "name": "橙", "value": { "物": 0.75, "属": 0.5 }, "bg-color": "rgb(255, 204, 153)" },
        { "name": "黄", "value": { "物": 1.0, "属": 0.75 }, "bg-color": "rgb(255, 255, 153)" },
        { "name": "緑", "value": { "物": 1.05, "属": 1.0 }, "bg-color": "rgb(204, 255, 153)" },
        { "name": "青", "value": { "物": 1.20, "属": 1.0625 }, "bg-color": "rgb(153, 153, 255)" },
        { "name": "白", "value": { "物": 1.32, "属": 1.125 }, "bg-color": "rgb(255, 255, 255)" },
    ],
    "ammo": [
        { "name": "Lv1通常弾", "value": 10 },
        { "name": "Lv2通常弾", "value": 20 },
        { "name": "Lv3通常弾", "value": 32 },
        { "name": "Lv1貫通弾", "value": 7 },
        { "name": "Lv2貫通弾", "value": 7 },
        { "name": "Lv3貫通弾", "value": 8 },
        { "name": "Lv1散弾(3hit)", "value": 6 },
        { "name": "Lv2散弾(5hit)", "value": 7 },
        { "name": "Lv3散弾(7hit)", "value": 8 },
        { "name": "属性弾(火,水,雷,氷)", "value": { "弾": 5, "属": 27 } },
        { "name": "属性弾(龍)", "value": { "弾": 2, "属": 18 } },
        { "name": "斬裂弾(5hit)", "value": { "弾": 1, "属": 31.5 } }
    ],
    "skill": {
        "attack": {
            "name": "攻撃",
            "text": "プレイヤーの攻撃力を上げる。レベルが上がると会心率にも影響がある。",
            "effects": [
                { "text": "基礎攻撃力+3", "addAttack": 3 },
                { "text": "基礎攻撃力+6", "addAttack": 6 },
                { "text": "基礎攻撃力+9", "addAttack": 9 },
                { "text": "基礎攻撃力+12、会心率+5%", "addAttack": 12, "addAffinity": 5 },
                { "text": "基礎攻撃力+15、会心率+5%", "addAttack": 15, "addAffinity": 5 },
                { "text": "基礎攻撃力+18、会心率+5%", "addAttack": 18, "addAffinity": 5 },
                { "text": "基礎攻撃力+21、会心率+5%", "addAttack": 21, "addAffinity": 5 },
            ]
        },
        "critical-eye": {
            "name": "見切り",
            "text": "会心率がUPする。",
            "effects": [
                { "text": "会心率+3%", "addAffinity": 3 },
                { "text": "会心率+6%", "addAffinity": 6 },
                { "text": "会心率+10%", "addAffinity": 10 },
                { "text": "会心率+15%", "addAffinity": 15 },
                { "text": "会心率+20%", "addAffinity": 20 },
                { "text": "会心率+25%", "addAffinity": 25 },
                { "text": "会心率+30%", "addAffinity": 30 },
            ]
        },
        "full-chage": {
            "name": "フルチャージ",
            "text": "体力が最大の時に攻撃力が上がる。",
            "effects": [
                { "text": "スキル発動中、基礎攻撃力+5", "addAttack": 5 },
                { "text": "スキル発動中、基礎攻撃力+10", "addAttack": 10 },
                { "text": "スキル発動中、基礎攻撃力+15", "addAttack": 15 },
            ]
        },
        "Weakness-exploit": {
            "name": "弱点特効",
            "text": "有効部位への攻撃時、会心率アップ。",
            "effects": [
                { "text": "モンスターの有効部位への攻撃時、会心率+15%", "addAffinity": 15 },
                { "text": "モンスターの有効部位への攻撃時、会心率+30%", "addAffinity": 30 },
                { "text": "モンスターの有効部位への攻撃時、会心率+50%", "addAffinity": 50 },
            ]
        },
        "agitator": {
            "name": "挑戦者",
            "text": "戦闘中の大型モンスターが怒ると、攻撃力と会心率が上昇する。",
            "effects": [
                { "text": "スキル発動中、基礎攻撃力+4・会心率+3%", "addAttack": 4, "addAffinity": 3 },
                { "text": "スキル発動中、基礎攻撃力+8・会心率+6%", "addAttack": 8, "addAffinity": 6 },
                { "text": "スキル発動中、基礎攻撃力+12・会心率+9%", "addAttack": 12, "addAffinity": 9 },
                { "text": "スキル発動中、基礎攻撃力+16・会心率+12%", "addAttack": 16, "addAffinity": 12 },
                { "text": "スキル発動中、基礎攻撃力+20・会心率+15%", "addAttack": 20, "addAffinity": 15 },
            ]
        },
        "critical-boost": {
            "name": "超会心",
            "text": "会心攻撃の際、ダメージが増加する。",
            "effects": [
                { "text": "会心攻撃時のダメージ倍率を1.3倍に強化する。", "mulAffinity": 1.3 },
                { "text": "会心攻撃時のダメージ倍率を1.35倍に強化する。", "mulAffinity": 1.35 },
                { "text": "会心攻撃時のダメージ倍率を1.4倍に強化する。", "mulAffinity": 1.4 },
            ]
        },
        "non-elemental-boost": {
            "name": "無属性強化",
            "text": "装備中の無属性武器を強化する。",
            "effects": [
                { "text": "装備中の無属性武器を強化する。", "mulAttack": 1.1 },
            ]
        },
        "maximum-might": {
            "name": "渾身",
            "text": "スタミナゲージが満タンの時、会心率が上がる。",
            "effects": [
                { "text": "効果発動時、会心率+10%", "addAffinity": 10 },
                { "text": "効果発動時、会心率+20%", "addAffinity": 20 },
                { "text": "効果発動時、会心率+30%", "addAffinity": 30 },
            ]
        },
        "critical-draw": {
            "name": "抜刀術【技】",
            "text": "武器出し攻撃の威力が上昇する。",
            "effects": [
                { "text": "武器出し攻撃の会心率+30%", "addAffinity": 30 },
                { "text": "武器出し攻撃の会心率+60%", "addAffinity": 60 },
                { "text": "武器出し攻撃の会心率+100%", "addAffinity": 100 },
            ]
        },
        "latent-power": {
            "name": "力の解放",
            "text": "特定の条件を満たすと、一定時間会心率が上昇し、スタミナを固定で消費する行動の消費量が軽減される。",
            "effects": [
                { "text": "スキル発動中、会心率+10％・スタミナ消費量10%軽減", "addAffinity": 10 },
                { "text": "スキル発動中、会心率+20％・スタミナ消費量20%軽減", "addAffinity": 20 },
                { "text": "スキル発動中、会心率+30％・スタミナ消費量30%軽減", "addAffinity": 30 },
                { "text": "スキル発動中、会心率+40％・スタミナ消費量40%軽減", "addAffinity": 40 },
                { "text": "スキル発動中、会心率+50％・スタミナ消費量50%軽減", "addAffinity": 50 },
            ]
        },
        "elemental-crit": {
            "name": "会心撃【属性】",
            "text": "攻撃で会心が発生した際に、与える属性ダメージ(火、水、雷、氷、龍)が高くなる",
            "effects": [
                { "text": "攻撃で会心が発生した際に、与える属性ダメージ(火、水、雷、氷、龍)が高くなる" },
            ]
        },
    }
};

function getSelectedWeapon(index) {
    return data["weapon"][index];
}

function getSelectedSharpness(index) {
    return data["sharpnesses"][index];
}

function getSelectedAmmo(index) {
    return data["ammo"][index];
}

function isString(obj) {
    return typeof (obj) == "string" || obj instanceof String;
};