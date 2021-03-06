//初期化
$(function () {
  setWeapons(data["weapon"]);
  setSharpness(data["sharpnesses"]);
  setAmmo(data["ammo"]);
  setSkill(data["skill"]);
  $('#sortdata').sortable();
  for (var i = 2; i <= 3; ++i) {
    $("#form1").clone(true).appendTo("#tab-" + i).attr('id', "form" + i);
  }
});

//武器種
function setWeapons(weapons) {
  for (var i = 0; i < weapons.length; ++i) {
    var weapon = weapons[i];
    var name = weapon.name;
    var value = weapon.value;
    $("select[name=weapon]").append($("<option>").val(i).text(name));
  }
  showWeaponSection("");
}

//切れ味
function setSharpness(sharpnesses) {
  for (var i = 0; i < sharpnesses.length; ++i) {
    var sharpness = sharpnesses[i];
    var name = sharpness.name;
    var color = sharpness["bg-color"];
    $("select[name=sharpness]").append($("<option>").val(i).text(name).css('background-color', color));
  }
  $("select[name=sharpness]").css("background-color", "rgb(200, 200, 200)");
}

//弾薬
function setAmmo(ammo) {
  for (var i = 0; i < ammo.length; ++i) {
    var name = ammo[i].name;
    var value = ammo[i].value;
    $("select[name=ammo]").append($("<option>").val(i).text(name));
  }
}

//スキル
function setSkill(skills) {
  for (key in skills) {
    var skill = skills[key];
    var nameCell = '<td class="skill-name-cell">' + skill["name"] + "</td>";
    var label = '<span class="label label-default">'
      + skill["text"] + "<br /></span>";
    var select = '<select class="form-control" name="' + key + '"></select>';
    var levelCell = "<td>" + label + select + "</td>";
    var rawData = "<tr>" + nameCell + levelCell + "</tr>"

    $('.skill-table').append(rawData);
    var effects = skill["effects"];
    $("select[name=" + key + "]").append($("<option>").val(-1).text("未発動"));
    for (var i = 0; i < effects.length; ++i) {
      $("select[name=" + key + "]").append(
        $("<option>").val(i).text("Lv" + (i + 1) + ":" + effects[i]["text"])
          .css("background-color", "white"));
    }
    $("select[name=" + key + "]").css("background-color", "rgb(200,200,200)");
    $("select[name=" + key + "]").change(function () {
      //選択したvalue値を変数に格納
      var val = $(this).val();
      var lastVal = $(this).children('option').length - 2;
      //選択したvalue値をp要素に出力
      if (val == -1) {
        $(this).css("background-color", "rgb(200,200,200)");
      } else if (val == lastVal) {
        $(this).css("background-color", "rgb(204,153,255)");
      } else {
        $(this).css("background-color", "white");
      }
    });
  }
}

//以下はユーザーの選択変更時の処理
function showWeaponSection(formId) {
  var weaponIndex = $(formId + ' select[name=weapon] option:selected').val()
  var selectedWeaponValue = getSelectedWeapon(weaponIndex).value;
  if (selectedWeaponValue == 1.2) {
    $(formId + ' .fencer').hide();
    $(formId + ' .bowgun').hide();
    $(formId + ' .bow').fadeIn();
    return "bow";
  } else if (selectedWeaponValue == 1.3
    || selectedWeaponValue == 1.5) {
    $(formId + ' .fencer').hide();
    $(formId + ' .bowgun').fadeIn();
    $(formId + ' .bow').hide();
    return "bowgun";
  } else {
    $(formId + ' .fencer').fadeIn();
    $(formId + ' .bowgun').hide();
    $(formId + ' .bow').hide();
    return "fencer";
  }
}

//切れ味selectの背景色を選択されたものに変更
function changeSharpnessBgColor(formId) {
  var sharpnessesForm = $(formId + ' select[name=sharpness] option:selected');
  var selectedSharpnessIndex = sharpnessesForm.val();
  var sharpnesses = getSelectedSharpness(selectedSharpnessIndex);
  var color = sharpnesses["bg-color"];
  $(formId + ' select[name=sharpness]').css("background-color", color);
}

//リセットボタンによるフォームのクリア
$(".all-reset").on("click", function (e) {
  var target = $(e.target);
  var tagName = target.prop("tagName");
  do {
    target = target.parent();
    tagName = target.prop("tagName");
  } while (tagName != "FORM");
  formReset(target);
  update(e);
});

$(".reset-btn").on("click", function (e) {
  var target = $(e.target);
  var tagName = target.prop("tagName");
  do {
    target = target.parent();
    tagName = target.prop("tagName");
  } while (tagName != "SECTION");
  formReset(target);
  update(e);
});

function formReset(target) {
  target.find('input[type="check"]').each(function (index, element) {
    element.checked = false;
  });
  target.find('input[type="number"]').each(function (index, element) {
    element.value = "";
  });
  target.find('select').each(function (index, element) {
    element.value = 0;
  });
  target.find('.skill-table select').each(function (index, element) {
    element.value = -1;
    //色も変える
    $("select[name=" + element.name + "]").css("background-color", "rgb(200,200,200)");
  });

}

//フォーム内容の変更時に更新
$("form").change(function (e) {
  update(e);
});
$("form").keyup(function (e) {
  update(e);
});


function update(e) {
  var target = $(e.target);
  var tagName = target.prop("tagName");
  do {
    target = target.parent();
    tagName = target.prop("tagName");
  } while (tagName != "FORM");
  var id = target.attr("id");
  updateExpectedDamage(id.replace("form", ""));
}

function getFormData(formId) {
  var $form = $(formId);
  var query = $form.serialize();
  var params = $form.serializeArray();
  var formData = {};
  for (var i = 0; i < params.length; ++i) {
    var param = params[i];
    if (param["value"]) {
      formData[param["name"]] = Number(param["value"]);
    } else {
      formData[param["name"]] = 0;
    }
  }
  return formData;
}

function getSharpnesses(formData, type) {
  var sharpness = formData["sharpness"];
  if (sharpness == 0) return 1;
  var val = getSelectedSharpness(sharpness)["value"][type];
  return val;
}

function getSkillEffects(formData) {
  var powerUpValues = { "addAttack": 0, "addAffinity": 0, "mulAttack": 0, "mulAffinity": 0 };
  for (var skill in data["skill"]) {
    var value = formData[skill];
    if (!isNaN(value)) {
      var val = Number(value);
      if (0 <= val) {
        var effect = data["skill"][skill]["effects"][val];
        for (var prop in effect) {
          if (prop != "text") {
            powerUpValues[prop] += effect[prop];
          }
        }
      }
    }
  }
  return powerUpValues;
}

function isElemental(type, formData) {
  if (type == "fencer") {
    if (0 < formData["elementalAttackPower-fencer"]) {
      return true;
    }
  }
  else if (type == "bow") {
    if (0 < formData["elementalAttackPower-bow"]) {
      return true;
    }
  } else {
    //弾威力
    var ammo = getSelectedAmmo(formData["ammo"]);
    var ammoValue = ammo["value"];
    if (isNaN(ammoValue)) {
      return true;
    }
  }
  return false;
}

//基礎攻撃力
function calcbaseAttackDamage(type, formData, powerUpValues) {
  var selectedWeapon = getSelectedWeapon(formData["weapon"]);
  var baseAttackDamage = formData["attackPower"] / selectedWeapon["value"];
  baseAttackDamage += powerUpValues["addAttack"];
  if (!isElemental(type, formData)) {
    baseAttackDamage *= Math.max(1, powerUpValues["mulAttack"]);
  }
  return baseAttackDamage;
}

//会心補正
function calcCriticalRate(formData, powerUpValues) {
  var affinity = powerUpValues["addAffinity"] + formData["affinity"];
  affinity = Math.min(100, affinity);
  var critical = 1.25;
  if (0 <= affinity) {
    critical = Math.max(1.25, powerUpValues["mulAffinity"]);
  }
  var ratioRatio = 1 + ((critical - 1) * affinity / 100);
  return ratioRatio;
}

//属性会心
function calcElementalCrit(formData, powerUpValues) {
  var elementalCrit = 1.0;
  if (0 <= formData["elemental-crit"]) {
    var w = getSelectedWeapon(formData["weapon"]).value;
    if (w == 1.2 || w == 1.4) {
      // 片手剣、双剣、弓
      elementalCrit = 1.35;
    } else if (w == 1.3 || w == 1.5) {
      // ライトボウガン、ヘビィボウガン
      elementalCrit = 1.3;
    } else if (w == 4.8) {
      // 大剣
      elementalCrit = 1.2;
    } else {
      // その他
      elementalCrit = 1.25;
    }
    var affinity = powerUpValues["addAffinity"] + formData["affinity"];;
    affinity = Math.min(100, affinity);
    var ratioRatio = 1 + ((elementalCrit - 1) * affinity / 100);
    return ratioRatio;
  }
  return elementalCrit;
}

function updateExpectedDamage(formNumber) {
  var formId = "#form" + formNumber;
  $(formId + " input[name=expectedDamage]").val("");
  $(formId + " input[name=expectedElementalDamage]").val("");

  var type = showWeaponSection(formId);

  var formData = getFormData(formId);//フォームの値
  var powerUpValues = getSkillEffects(formData);//攻撃と会心

  //基礎攻撃力
  var baseAttackDamage = calcbaseAttackDamage(type, formData, powerUpValues);

  //属性ダメージ(会心補正で初期化)
  var elementalDamage = calcElementalCrit(formData, powerUpValues);

  if (type === "bowgun") {
    elementalDamage *= baseAttackDamage;

    //距離補正
    var bowgunBritical = formData["bowgun-critical"];
    if (bowgunBritical == "on") {
      baseAttackDamage *= 1.25;
    }
    //速射補正
    var quieckFire = formData["quick-fire"];
    if (quieckFire == "on") {
      baseAttackDamage *= 2;
    }
    //会心率
    var criticalRate = calcCriticalRate(formData, powerUpValues);

    //物理ダメージ
    var attackDamage = baseAttackDamage * criticalRate;

    //弾攻撃力
    var ammoDamage = attackDamage;

    //弾威力
    var ammo = getSelectedAmmo(formData["ammo"]);
    var ammoValue = ammo["value"];
    if (isNaN(ammoValue)) {
      ammoDamage *= ammoValue["弾"];
      elementalDamage *= ammoValue["属"];
    } else {
      ammoDamage *= ammoValue;
      elementalDamage = 0;
    }

    var expectedDamage = Math.floor(attackDamage);
    var expectedAmmoDamage = Math.floor(ammoDamage);
    var expectedElementalDamage = Math.floor(elementalDamage);
    if (!isNaN(expectedDamage)) {
      $(formId + " input[name=expectedDamage]").val(expectedDamage);
    }
    if (!isNaN(expectedElementalDamage)) {
      $(formId + " input[name=expectedElementalDamage]").val(expectedElementalDamage);
    }
    if (!isNaN(expectedAmmoDamage)) {
      $(formId + " input[name=expectedAmmoDamage]").val(expectedAmmoDamage);
    }
  } else {
    if (type === "fencer") {
      changeSharpnessBgColor(formId);
      elementalDamage *= formData["elementalAttackPower-fencer"] / 10;//武器の属性値

      //切れ味
      baseAttackDamage *= getSharpnesses(formData, "物");
      elementalDamage *= getSharpnesses(formData, "属");
    } else if (type === "bow") {
      elementalDamage *= formData["elementalAttackPower-bow"] / 10;//武器の属性値

      //距離補正
      var bowBritical = formData["bow-critical"];
      if (bowBritical == "on") {
        baseAttackDamage *= 1.25;
      }
    }

    //会心率
    var criticalRate = calcCriticalRate(formData, powerUpValues);

    //物理ダメージ
    var attackDamage = baseAttackDamage * criticalRate;

    var expectedDamage = Math.floor(attackDamage);
    var expectedElementalDamage = Math.floor(elementalDamage);

    if (!isNaN(expectedDamage)) {
      $(formId + " input[name=expectedDamage]").val(expectedDamage);
    }
    if (!isNaN(expectedElementalDamage)) {
      $(formId + " input[name=expectedElementalDamage]").val(expectedElementalDamage);
    }
  }
}