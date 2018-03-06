//初期化
$(function () {
  for (var i = 2; i <= 3; ++i) {
    $("#form1").clone(true).appendTo("#tab-" + i).attr('id', "form" + i);
  }
  setWeapons(data["weapon"]);
  setSharpness(data["sharpnesses"]);
  setAmmo(data["ammo"]);
  setSkill(data["skill"]);
  $('#sortdata').sortable();
  updataAll();
});

//武器種
function setWeapons(weapons) {
  for (key in weapons) {
    $("select[name=weapon]").append($("<option>").val(weapons[key]).text(key));
  }
  showWeaponSection("");
}

//切れ味
function setSharpness(sharpnesses) {
  var i = 0;
  for (key in sharpnesses) {
    var sharpness = sharpnesses[key];
    $("select[name=sharpness]").append($("<option>").val(i++).text(key).css('background-color', sharpness["bg-color"]));
  }
}

//弾薬
function setAmmo(ammo) {
  for (key in ammo) {
    $("select[name=ammo]").append($("<option>").val(ammo[key]).text(key));
  }
}

//スキル
function setSkill(skills) {
  for (key in skills) {
    var skill = skills[key];
    var nameCell = "<td>" + skill["name"] + "</td>";
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
  var weaponName = $(formId + ' select[name=weapon] option:selected').text()
  var weapon = data["weapon"];
  if (weapon[weaponName] == 1.2) {
    $(formId + ' .fencer').hide();
    $(formId + ' .bowgun').hide();
    $(formId + ' .bow').fadeIn();
    return "bow";
  } else if (weapon[weaponName] == 1.3
    || weapon[weaponName] == 1.5) {
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
  var selectedSharpness = sharpnessesForm.text();
  if (selectedSharpness === '') return;
  var sharpnesses = data["sharpnesses"];
  var color = sharpnesses[selectedSharpness]["bg-color"];
  $(formId + ' select[name=sharpness]').css("background-color", color);
}

$("form").change(function () {
  updataAll();
});
$("form").keyup(function (e) {
  updataAll();
});
function getFormData(formId) {
  var $form = $(formId);
  var query = $form.serialize();
  var params = $form.serializeArray();
  var data = {};
  for (var i = 0; i < params.length; ++i) {
    var param = params[i];
    if (param["value"]) {
      data[param["name"]] = Number(param["value"]);
    } else {
      data[param["name"]] = 0;
    }
  }
  return data;
}

function updataAll() {
  updateExpectedDamage(1);
  updateExpectedDamage(2);
  updateExpectedDamage(3);
}

function calcAddBaseAttack(data) {
  return 1;
}
function calcMulBaseAttack(data) {
  return 1;
}
function calcAddAffinity(data) {
  return 1;
}
function calcMulAffinity(data) {
  return 1.25;
}
function getSharpnesses(data) {
  return 1;
}
function updateExpectedDamage(formNumber) {
  var formId = "#form" + formNumber;
  var type = showWeaponSection(formId);
  changeSharpnessBgColor(formId);
  //フォーム内の要素に変更があると発火    
  var data = getFormData(formId);

  var baseAttackDamage = ((data["attackPower"] / data["weapon"])
    + calcAddBaseAttack(data)) * calcMulBaseAttack(data);//基礎攻撃力
  var criticalRate = data["affinity"] + calcAddAffinity(data);
  var expectedDamage = (baseAttackDamage * criticalRate * calcMulAffinity(data)
    + baseAttackDamage * (100 - criticalRate)) / 100;
  //会心率
  expectedDamage = Math.floor(expectedDamage);
  var expectedElementalDamage = Math.floor(data["elementalAttackPower"] / 10);//属性
  $(formId + " input[name=expectedDamage]").val(expectedDamage);
  $(formId + " input[name=expectedElementalDamage]").val(expectedElementalDamage);
}