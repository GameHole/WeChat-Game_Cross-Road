let CustomMaterial = require("CustomMaterial");
var ShaderHelper = function () {}
ShaderHelper.applyShaderByName = function (name, sprite) {
    let _shaderObject = CustomMaterial.getShader(name);
    let params = _shaderObject.params;
    let defines = _shaderObject.defines;
    let material = sprite.getMaterial(_shaderObject.name);

    if (!material) {
        material = new CustomMaterial(_shaderObject.name, params, defines || []);
        sprite.setMaterial(_shaderObject.name, material);
    }
    sprite.activateMaterial(_shaderObject.name);

    //设置Shader参数初值
    if (params) {
        params.forEach((item) => {
            if (item.defaultValue !== undefined) {
                material.setParamValue(item.name, item.defaultValue);
            }
        });
    }

    if (_shaderObject.start) {
        _shaderObject.start(sprite, material);
    }
}
module.exports = ShaderHelper;