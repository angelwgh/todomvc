(function(angular) {
	'use strict';
	//应用程序的主要模块
	var myApp = angular.module('myTodoMVC', []);
	//注册一个控制器
	myApp.controller('mainController', ['$scope', function($scope) {
			//文本输入框需要一个模型
			$scope.text = '';
			//任务列表模型
			//任务结构{id:id,text:text,completed:true}
			$scope.todos = [{
				id: 1,
				text: '吃饭',
				completed: false
			}, {
				id: 2,
				text: '睡觉',
				completed: false
			}, {
				id: 3,
				text: '打豆豆',
				completed: true
			}];
			//添加任务的方法
			$scope.add = function() {
					if (!$scope.text) {
						return;
						//如果没有输入内容，则不添加任务
					}
					$scope.todos.unshift({
							id: (new Date()).getTime(),
							text: $scope.text, //拿到输入框的任容
							completed: false
						})
						//清空输入框文本
					$scope.text = '';
				}
				//删除任务的方法
			$scope.remove = function(id) {
					//删除对应id的任务
					for (var i = 0; i < $scope.todos.length; i++) {
						if (id === $scope.todos[i].id) {
							$scope.todos.splice(i, 1);
							break;
						}
					}
				}
				//清除已经完成的任务
			$scope.clear = function() {
					var i = 0;
					while (i < $scope.todos.length) {
						if (true === $scope.todos[i].completed) {
							$scope.todos.splice(i, 1);
						} else {
							i++;
						}
					}
				}
				//判断是否有已完成的任务
			$scope.hasCompleted = function() {
				for (var i = 0; i < $scope.todos.length; i++) {
					if ($scope.todos[i].completed) {
						return false;
					}
				}
				return true;
			}

			$scope.editingId = -1;
			//双击文字获取对应的id设置添加classname为editing
			//已完成的任务不能编辑
			$scope.editing = function(id, com) {
					if (com) {
						return
					};
					$scope.editingId = id;
				}
				//完成编辑
			$scope.save = function() {
				$scope.editingId = -1;
			}

			//点击完成/取消所有任务
			var toggle_all = true;
			$scope.toggleAll = function() {
				for (var i = 0; i < $scope.todos.length; i++) {
					$scope.todos[i].completed = toggle_all;
				}
				toggle_all = !toggle_all;
			}


		}])
		//自定义获取焦点指令
	myApp.directive('setFocus', [function() {
		return {
			link: function(scope, element, attributes) {
				scope.$watch("editingId", function(newValue, oldValue, scope) {
					//通过id判断当前的input标签使其获得焦点
					if (attributes.data == scope.editingId) {
						setTimeout(function() {
							element[0].focus();
						}, 0)
					}
				})
			}

		}
	}])


})(angular);